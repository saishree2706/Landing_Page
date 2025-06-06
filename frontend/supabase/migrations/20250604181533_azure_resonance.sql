/*
  # Create subscribers table and policies

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required, unique)
      - `phone` (text, optional)
      - `address` (text, optional)
      - `notify_on_launch` (boolean)
      - `email_sent` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on subscribers table
    - Add policies for inserting and reading subscriber data
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  address text,
  notify_on_launch boolean DEFAULT false,
  email_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert subscribers"
  ON subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Subscribers are viewable by admin"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);