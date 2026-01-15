-- 1. Add category column if it doesn't exist
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category text DEFAULT 'misc';

-- 2. Seed Products
INSERT INTO public.products (title, description, price, currency, image_url, seller_id, category)
VALUES
  (
    'Ultimate Forex Mastery Course', 
    'Master the art of Forex trading with this comprehensive guide.', 
    550.00, 
    'GHS', 
    'https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&auto=format&fit=crop&q=60',
    (SELECT id FROM public.profiles LIMIT 1),
    'course'
  ),
  (
    'Accra Tech Community Access', 
    'Join the most vibrant community of techies in Accra.', 
    150.00, 
    'GHS', 
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
    (SELECT id FROM public.profiles LIMIT 1),
    'community'
  ),
  (
    'AfroBeats Production Masterclass', 
    'Learn to produce chart-topping AfroBeats tracks.', 
    300.00, 
    'GHS', 
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60',
    (SELECT id FROM public.profiles LIMIT 1),
    'course'
  ),
  (
    'Ghana Stock Market Guide 2024', 
    'A detailed analysis of the GSE.', 
    100.00, 
    'GHS', 
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60',
    (SELECT id FROM public.profiles LIMIT 1),
    'ebook'
  ),
  (
    'VS Code Pro Setup', 
    'Boost productivity by 10x.', 
    50.00, 
    'GHS', 
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60',
    (SELECT id FROM public.profiles LIMIT 1),
    'software'
  );
