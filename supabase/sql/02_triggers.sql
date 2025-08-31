-- Ensure profile exists on user signup and assign roles
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles(id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name',
          case when lower(new.email) = 'devesh.pillewan@amla.io' then 'super_admin' else 'admin' end::public.user_role)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
