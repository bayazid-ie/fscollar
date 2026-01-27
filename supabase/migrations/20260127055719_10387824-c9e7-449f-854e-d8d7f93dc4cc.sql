-- Add payment fields to orders table
ALTER TABLE public.orders 
ADD COLUMN payment_method TEXT DEFAULT 'cod',
ADD COLUMN payment_phone TEXT,
ADD COLUMN payment_trxid TEXT;