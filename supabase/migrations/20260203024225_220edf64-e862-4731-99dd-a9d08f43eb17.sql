-- Create order validation trigger function
CREATE OR REPLACE FUNCTION public.validate_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate phone number (Bangladesh format: 01X-XXXXXXXX)
  IF NEW.phone !~ '^01[3-9][0-9]{8}$' THEN
    RAISE EXCEPTION 'Invalid phone number format. Must be a valid Bangladesh mobile number (e.g., 01712345678)';
  END IF;

  -- Validate name (not empty, max 100 chars, no suspicious characters)
  IF NEW.name IS NULL OR length(trim(NEW.name)) < 2 THEN
    RAISE EXCEPTION 'Name must be at least 2 characters';
  END IF;
  
  IF length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be less than 100 characters';
  END IF;

  -- Validate address (not empty, max 500 chars)
  IF NEW.address IS NULL OR length(trim(NEW.address)) < 5 THEN
    RAISE EXCEPTION 'Address must be at least 5 characters';
  END IF;
  
  IF length(NEW.address) > 500 THEN
    RAISE EXCEPTION 'Address must be less than 500 characters';
  END IF;

  -- Validate quantity (1-100 range)
  IF NEW.quantity < 1 OR NEW.quantity > 100 THEN
    RAISE EXCEPTION 'Quantity must be between 1 and 100';
  END IF;

  -- Validate unit_price and total (must be positive)
  IF NEW.unit_price <= 0 THEN
    RAISE EXCEPTION 'Unit price must be positive';
  END IF;

  IF NEW.total <= 0 THEN
    RAISE EXCEPTION 'Total must be positive';
  END IF;

  -- Recalculate and validate total server-side
  IF NEW.total != (NEW.unit_price * NEW.quantity) + NEW.delivery_charge THEN
    -- Auto-correct the total
    NEW.total := (NEW.unit_price * NEW.quantity) + NEW.delivery_charge;
  END IF;

  -- Validate payment phone if provided
  IF NEW.payment_phone IS NOT NULL AND NEW.payment_phone != '' THEN
    IF NEW.payment_phone !~ '^01[3-9][0-9]{8}$' THEN
      RAISE EXCEPTION 'Invalid payment phone number format';
    END IF;
  END IF;

  -- Validate payment method
  IF NEW.payment_method IS NOT NULL AND NEW.payment_method NOT IN ('cod', 'bkash', 'nagad') THEN
    RAISE EXCEPTION 'Invalid payment method';
  END IF;

  -- Validate notes length if provided
  IF NEW.notes IS NOT NULL AND length(NEW.notes) > 1000 THEN
    RAISE EXCEPTION 'Notes must be less than 1000 characters';
  END IF;

  -- Sanitize text fields (trim whitespace)
  NEW.name := trim(NEW.name);
  NEW.address := trim(NEW.address);
  NEW.phone := trim(NEW.phone);
  IF NEW.notes IS NOT NULL THEN
    NEW.notes := trim(NEW.notes);
  END IF;
  IF NEW.payment_phone IS NOT NULL THEN
    NEW.payment_phone := trim(NEW.payment_phone);
  END IF;
  IF NEW.payment_trxid IS NOT NULL THEN
    NEW.payment_trxid := trim(NEW.payment_trxid);
  END IF;

  RETURN NEW;
END;
$$;

-- Create the trigger for order validation
DROP TRIGGER IF EXISTS validate_order_before_insert ON public.orders;
CREATE TRIGGER validate_order_before_insert
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_order();

-- Also validate on updates
DROP TRIGGER IF EXISTS validate_order_before_update ON public.orders;
CREATE TRIGGER validate_order_before_update
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_order();