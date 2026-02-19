-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  -- App State Data (JSONB columns for flexibility)
  preferences jsonb,
  stats jsonb default '{"outfitsTried": 0, "imagesUploaded": 0, "savedLooks": 0}',
  saved_outfits jsonb,
  recent_activity jsonb
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Trigger to create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, stats, preferences, saved_outfits, recent_activity)
  values (
      new.id, 
      new.email, 
      new.raw_user_meta_data->>'full_name', 
      '{"outfitsTried": 0, "imagesUploaded": 0, "savedLooks": 0}',
      null,
      '[]',
      '[]'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
