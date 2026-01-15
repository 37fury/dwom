-- Allow users to insert their own wallet transactions (Required for Top Up simulation)
create policy "Users can insert own wallet transactions."
  on public.wallet_transactions for insert
  with check ( auth.uid() = user_id );
