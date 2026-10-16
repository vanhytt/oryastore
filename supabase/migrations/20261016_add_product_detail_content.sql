ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS uses TEXT,
  ADD COLUMN IF NOT EXISTS usage_instructions TEXT;

DO $$
DECLARE
  ingredients_type TEXT;
BEGIN
  SELECT data_type
    INTO ingredients_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'products'
      AND column_name = 'ingredients';

  IF ingredients_type = 'ARRAY' THEN
    ALTER TABLE public.products
      ALTER COLUMN ingredients TYPE TEXT
      USING array_to_string(ingredients, E'\n');
  ELSIF ingredients_type IS NULL THEN
    ALTER TABLE public.products
      ADD COLUMN ingredients TEXT;
  END IF;
END;
$$;

UPDATE public.products
SET uses = NULLIF(array_to_string(benefits, E'\n'), '')
WHERE (uses IS NULL OR btrim(uses) = '')
  AND benefits IS NOT NULL;

UPDATE public.products
SET usage_instructions = NULLIF(array_to_string(usage, E'\n'), '')
WHERE (usage_instructions IS NULL OR btrim(usage_instructions) = '')
  AND usage IS NOT NULL;
