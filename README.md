# Kaun Banega Champion — Manual Deployment

This is a static HTML/CSS/JavaScript build using Supabase Realtime.

## Included

- `index.html` — branded landing page
- `admin.html` — authenticated admin control room
- `participant.html` — participant game screen
- `live.html` — public audience screen
- `styles.css` — original visual design
- `js/config.js` — Supabase project URL + publishable key
- `js/common.js` — shared Supabase helpers

## Supabase already prepared

Project: `lstldcoqwbofhvzihsll`

The existing database includes `questions`, `admin_users`, `game_state`, `participant_answers`, and `viewers`.

A public-safe `live_selections` table has also been added. The audience receives participant name + selected option, but not the hidden `is_correct` field.

## Create the admin user

1. Supabase Dashboard → Authentication → Users.
2. Create an Email/Password user for the host/admin.
3. Copy that user's UUID.
4. Run:

```sql
insert into public.admin_users(user_id, display_name)
values ('PASTE_AUTH_USER_UUID_HERE', 'Host');
```

Do not create an open admin signup form.

## Put the website on GitHub

Copy the contents of this folder into the root of the `KBC` repository.

Recommended root:

```text
KBC/
  index.html
  admin.html
  participant.html
  live.html
  styles.css
  favicon.svg
  js/
    config.js
    common.js
```

Remove temporary test files such as `test-write.txt` and `ACCESS_TEST.md` when convenient.

## GitHub Pages

Repository → Settings → Pages → Deploy from branch → `main` → `/ (root)`.

The pages will be:

```text
https://<username>.github.io/KBC/
https://<username>.github.io/KBC/admin.html
https://<username>.github.io/KBC/participant.html
https://<username>.github.io/KBC/live.html
```

## Live flow

1. Host logs in at `admin.html`.
2. Host creates/edits questions.
3. Host clicks Start Selected.
4. Participant joins at `participant.html`, chooses A/B/C/D, then submits.
5. Public audience joins at `live.html`.
6. Supabase Realtime pushes game-state and live-selection changes to all connected screens.
7. Host clicks Reveal Answer only when ready.

## Security notes

The browser only uses the Supabase publishable key. The service-role key must never be placed in this project.

The participant and public screens do not query `questions.correct_option`. Correctness is calculated server-side by the database trigger on `participant_answers`, while public live updates come from the separate `live_selections` table.

## Current implementation note

The timer is initialized to 20 seconds when the host starts a question. Change the `limit` constant in `admin.html` to customize it.
