-- Create a sequence for order IDs starting from 101
CREATE SEQUENCE IF NOT EXISTS public.order_id_seq START WITH 101;

-- Add order_id column to orders table
ALTER TABLE public.orders 
ADD COLUMN order_id TEXT UNIQUE;

-- Create a function to generate order ID
CREATE OR REPLACE FUNCTION public.generate_order_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_id := 'CC' || LPAD(nextval('public.order_id_seq')::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate order_id on insert
CREATE TRIGGER set_order_id
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.generate_order_id();