SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict q5vVZGDnPp4rlBxJctMR90RgO6MyUhkpAf75euvA8lVGo9sagfXrPpdxnnH2xC2

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '2a7a550b-1070-4ffa-aff4-8b27b2e534e7', '{"action":"user_signedup","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-10-15 23:37:47.348614+00', ''),
	('00000000-0000-0000-0000-000000000000', '9937523d-a2df-4674-8bb6-adcd324eca82', '{"action":"login","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-15 23:37:47.351558+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fab1d279-a42b-45d6-9470-f3cfe46ab2a1', '{"action":"logout","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-15 23:37:53.246411+00', ''),
	('00000000-0000-0000-0000-000000000000', '74796145-54a5-4f87-9414-935b72308082', '{"action":"login","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-15 23:38:01.941469+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e8ad3ee-e889-4371-a35d-4e8f3205c560', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 00:38:46.416251+00', ''),
	('00000000-0000-0000-0000-000000000000', '32d3fa3b-21e1-4d5e-80eb-bb6cb6ecbfc3', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 00:38:46.417322+00', ''),
	('00000000-0000-0000-0000-000000000000', '85833d5b-467d-41d6-b2cd-dd78546c9bb8', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 13:43:51.848652+00', ''),
	('00000000-0000-0000-0000-000000000000', '720e4436-d7a4-4243-bd69-2fa6881a1a9f', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 13:43:51.84928+00', ''),
	('00000000-0000-0000-0000-000000000000', '5cc98527-0a17-4baa-8afc-8dc3ab1e502e', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 14:42:18.456121+00', ''),
	('00000000-0000-0000-0000-000000000000', '39346409-00f7-4d43-aaf4-952726a8b920', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-16 14:42:18.458096+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e621595e-4297-4d72-9a66-b72b3634bff6', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-21 14:43:28.51213+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ec5ee0c-0c9e-49f5-94f7-6566e26677da', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-21 14:43:28.515676+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f882da94-d3fc-4c65-9100-9a52166a35ec', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 14:08:30.721754+00', ''),
	('00000000-0000-0000-0000-000000000000', '88e89f58-6e33-4013-b4b3-d4c460a40ed8', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 14:08:30.724845+00', ''),
	('00000000-0000-0000-0000-000000000000', '42839f1d-2bde-4254-b532-94843bb2761e', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 15:06:32.802205+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce6dca63-de64-49f9-8d88-6c940db918da', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 15:06:32.804869+00', ''),
	('00000000-0000-0000-0000-000000000000', '448a7b13-beed-4e81-83d1-36057e4c0b29', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 16:20:07.99451+00', ''),
	('00000000-0000-0000-0000-000000000000', '899bc655-3053-40a2-818a-42dde4610d99', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 16:20:07.995758+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d565f97-ad0e-4801-a014-83c90870784d', '{"action":"token_refreshed","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 20:47:50.693018+00', ''),
	('00000000-0000-0000-0000-000000000000', '27d7b6c3-8d0f-4b6f-8672-5f7a2c36f804', '{"action":"token_revoked","actor_id":"ebe482b0-671e-424d-a78e-bb4e3f9dc432","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-23 20:47:50.694186+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', 'authenticated', 'authenticated', 'spadnos@gmail.com', '$2a$10$e4FdfhGq5oISJajrHs5li.PnJLPMOOugx4/zJEry/eFqlCmjAbxeS', '2025-10-15 23:37:47.349971+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-10-15 23:38:01.941921+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ebe482b0-671e-424d-a78e-bb4e3f9dc432", "email": "spadnos@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-10-15 23:37:47.338382+00', '2025-10-23 20:47:50.696607+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('ebe482b0-671e-424d-a78e-bb4e3f9dc432', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', '{"sub": "ebe482b0-671e-424d-a78e-bb4e3f9dc432", "email": "spadnos@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-10-15 23:37:47.346522+00', '2025-10-15 23:37:47.346541+00', '2025-10-15 23:37:47.346541+00', '03f595ae-4963-41c7-a88d-97c867782098');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', '2025-10-15 23:38:01.94196+00', '2025-10-23 20:47:50.697537+00', NULL, 'aal1', NULL, '2025-10-23 20:47:50.697507', 'Next.js Middleware', '172.217.12.106', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd', '2025-10-15 23:38:01.943103+00', '2025-10-15 23:38:01.943103+00', 'password', '713f8c80-6b33-4873-9d55-e5056ceeb114');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 2, 'om4uyr5dg4xp', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-15 23:38:01.9424+00', '2025-10-16 00:38:46.417868+00', NULL, 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 3, 'w4t723ufc5nd', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-16 00:38:46.419455+00', '2025-10-16 13:43:51.849767+00', 'om4uyr5dg4xp', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 4, 'xgxaiier3gec', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-16 13:43:51.850199+00', '2025-10-16 14:42:18.458447+00', 'w4t723ufc5nd', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 5, 'tobbohvoazw2', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-16 14:42:18.459234+00', '2025-10-21 14:43:28.516197+00', 'xgxaiier3gec', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 6, 'ye4vhc3w366u', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-21 14:43:28.518283+00', '2025-10-23 14:08:30.728082+00', 'tobbohvoazw2', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 7, 'vxx4ciowl3jg', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-23 14:08:30.737315+00', '2025-10-23 15:06:32.805159+00', 'ye4vhc3w366u', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 8, 'etx7kqk5n3bx', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-23 15:06:32.807578+00', '2025-10-23 16:20:07.995974+00', 'vxx4ciowl3jg', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 9, 'rakcafekeq6c', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', true, '2025-10-23 16:20:07.997035+00', '2025-10-23 20:47:50.694446+00', 'etx7kqk5n3bx', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd'),
	('00000000-0000-0000-0000-000000000000', 10, 'yfgt263ocyr6', 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', false, '2025-10-23 20:47:50.695435+00', '2025-10-23 20:47:50.695435+00', 'rakcafekeq6c', 'e7ce3fca-e3e9-47e3-9182-d3f8f766b6fd');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("id", "name", "display_order", "created_at") VALUES
	('efd6eb89-30c0-4fe3-bf24-5f8fb442d669', 'Appetizers', 0, '2025-10-15 15:51:27.593398+00'),
	('e5cdd1d3-c844-46aa-81d1-3294e34055e8', 'Entrees', 1, '2025-10-15 15:51:27.593398+00'),
	('3a64ad47-5677-4c80-a0b8-69033d0563c2', 'Desserts', 2, '2025-10-15 15:51:27.593398+00'),
	('d67e73d3-f07b-46e9-ba11-aa5548989e3d', 'Beverages', 3, '2025-10-15 15:51:27.593398+00'),
	('8da7a265-94d2-43ca-a003-70e613fdadd2', 'Sides', 4, '2025-10-15 15:51:27.593398+00');


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."menu_items" ("id", "name", "description", "category_id", "image_url", "created_at", "updated_at") VALUES
	('af187c79-5588-4975-9de6-e3a7dd8b3d97', 'Bruschetta', 'Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil', 'efd6eb89-30c0-4fe3-bf24-5f8fb442d669', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Bruschetta', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('ca9c743d-abff-4d0d-9759-5f6c949026a7', 'French Onion Soup', 'Classic soup with caramelized onions, beef broth, and melted Gruyère cheese', 'efd6eb89-30c0-4fe3-bf24-5f8fb442d669', 'https://placehold.co/600x400/e8d5b7/8b4513?text=French+Onion+Soup', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('db0411ac-7942-48d0-aed6-19394bc34702', 'Escargots de Bourgogne', 'Burgundy snails baked in garlic-parsley butter', 'efd6eb89-30c0-4fe3-bf24-5f8fb442d669', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Escargots', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('573aa624-04a0-4452-ae07-2b462ca9e56f', 'Grilled Salmon', 'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables', 'e5cdd1d3-c844-46aa-81d1-3294e34055e8', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Grilled+Salmon', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('1f7e555a-8373-4c4c-b75d-f4b07a95376b', 'Coq au Vin', 'Traditional French chicken braised in red wine with mushrooms, onions, and bacon', 'e5cdd1d3-c844-46aa-81d1-3294e34055e8', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Coq+au+Vin', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('49f518da-6989-4df7-952e-2fee7ece34e1', 'Beef Bourguignon', 'Tender beef slow-cooked in red wine with carrots, pearl onions, and herbs', 'e5cdd1d3-c844-46aa-81d1-3294e34055e8', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Beef+Bourguignon', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('3f41d565-7c05-472d-a2ca-b7e302046531', 'Ratatouille', 'Provençal vegetable stew with eggplant, zucchini, peppers, and tomatoes', 'e5cdd1d3-c844-46aa-81d1-3294e34055e8', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Ratatouille', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('679ae870-6b9e-474e-89a4-687bdaac97d3', 'Duck Confit', 'Slow-cooked duck leg with crispy skin, served with roasted potatoes', 'e5cdd1d3-c844-46aa-81d1-3294e34055e8', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Duck+Confit', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('0467760d-48a2-4833-849c-d5e245001d76', 'Crème Brûlée', 'Classic French custard with caramelized sugar crust', '3a64ad47-5677-4c80-a0b8-69033d0563c2', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Creme+Brulee', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('39e2ddf1-91e5-41a0-bcea-fb69970461b2', 'Chocolate Mousse', 'Rich and airy dark chocolate mousse topped with whipped cream', '3a64ad47-5677-4c80-a0b8-69033d0563c2', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Chocolate+Mousse', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('3e8e7797-a288-43ec-8abe-9cbe8394654d', 'Tarte Tatin', 'Upside-down caramelized apple tart served warm with vanilla ice cream', '3a64ad47-5677-4c80-a0b8-69033d0563c2', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Tarte+Tatin', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('8087d941-c218-41c1-9dae-0bd8fb738be7', 'Profiteroles', 'Cream puffs filled with vanilla ice cream, drizzled with warm chocolate sauce', '3a64ad47-5677-4c80-a0b8-69033d0563c2', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Profiteroles', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('65c21cfd-23ad-41e4-bb12-15b9f9e15267', 'House Red Wine', 'Carefully selected French red wine, perfect pairing for our entrees', 'd67e73d3-f07b-46e9-ba11-aa5548989e3d', NULL, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('65b8b683-5f69-4088-8241-136fca69f53b', 'House White Wine', 'Crisp and refreshing French white wine', 'd67e73d3-f07b-46e9-ba11-aa5548989e3d', NULL, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('4cbf583f-f12a-4c17-8375-1da7db07231d', 'Espresso', 'Rich Italian espresso, the perfect end to your meal', 'd67e73d3-f07b-46e9-ba11-aa5548989e3d', NULL, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('37a2db42-95be-4112-9f5d-ef5bd5adba7d', 'French Press Coffee', 'Freshly brewed French press coffee', 'd67e73d3-f07b-46e9-ba11-aa5548989e3d', NULL, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('ab2a25d5-b66d-4e16-bdd2-f2155da6767d', 'Pommes Frites', 'Crispy French fries with sea salt', '8da7a265-94d2-43ca-a003-70e613fdadd2', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Pommes+Frites', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('7b521d4f-5c9a-4f3e-9d2d-b8df362da853', 'Haricots Verts', 'Fresh green beans sautéed with garlic and butter', '8da7a265-94d2-43ca-a003-70e613fdadd2', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Haricots+Verts', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00'),
	('a3a53480-94c4-43fd-af3d-b4b7f18b6119', 'Gratin Dauphinois', 'Creamy potato gratin with Gruyère cheese', '8da7a265-94d2-43ca-a003-70e613fdadd2', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Gratin+Dauphinois', '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00');


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."recipes" ("id", "ingredients", "instructions", "prep_time_mins", "created_at", "updated_at", "cook_time_mins", "created_by", "description", "image_url", "name", "servings", "source_url") VALUES
	('5b1321b4-5b90-4452-9e37-12e31e15f12e', '["Fresh Atlantic salmon fillet 6 oz", "Olive oil 2 tbsp", "Lemon juice 1 tbsp", "Butter 2 tbsp", "Fresh dill 1 tbsp chopped", "Salt and pepper to taste"]', '{"Preheat grill to medium-high heat (400°F)","Pat salmon dry and brush with olive oil","Season both sides with salt and pepper","Place salmon skin-side down on grill","Grill for 4-5 minutes per side until flaky","Meanwhile, melt butter and mix with lemon juice and dill","Remove salmon from grill and drizzle with lemon butter","Serve immediately with seasonal vegetables"}', 15, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00', 25, NULL, 'Fresh Atlantic salmon with lemon butter sauce', NULL, 'Grilled Salmon', 2, NULL),
	('959e14eb-9b3d-44d7-b4b8-976241be3b09', '["Chicken thighs and drumsticks 3 lbs", "Bacon 6 oz diced", "Pearl onions 12 oz", "Mushrooms 8 oz quartered", "Red wine 2 cups", "Chicken stock 1 cup", "Tomato paste 2 tbsp", "Garlic cloves 4 minced", "Fresh thyme 4 sprigs", "Bay leaves 2", "Flour 2 tbsp", "Butter 2 tbsp"]', '{"Season chicken pieces with salt and pepper","In a large Dutch oven, cook bacon until crispy, remove and set aside","Brown chicken in bacon fat, remove and set aside","Sauté pearl onions until golden, remove and set aside","Sauté mushrooms until browned, remove and set aside","Add garlic and cook for 1 minute","Stir in flour and tomato paste","Add wine, scraping up browned bits","Add chicken stock, thyme, and bay leaves","Return chicken and bacon to pot","Cover and simmer for 45 minutes","Add onions and mushrooms, simmer 15 more minutes","Remove thyme sprigs and bay leaves","Stir in butter until melted","Serve hot with crusty bread or mashed potatoes"}', 30, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00', 90, NULL, 'Traditional French chicken braised in red wine', NULL, 'Coq au Vin', 4, NULL),
	('da2ff768-a1c5-45ed-92b0-c146b96bc5c5', '["Heavy cream 2 cups", "Egg yolks 6 large", "Granulated sugar 1/2 cup plus extra for topping", "Vanilla extract 1 tsp", "Salt pinch"]', '{"Preheat oven to 325°F","Heat cream in a saucepan until it just begins to simmer","In a bowl, whisk egg yolks with 1/2 cup sugar until pale","Slowly pour hot cream into egg mixture, whisking constantly","Stir in vanilla and salt","Strain mixture through fine-mesh sieve","Pour into 6 ramekins","Place ramekins in baking dish and add hot water halfway up sides","Bake for 40-45 minutes until set but still jiggly in center","Remove from water bath and cool to room temperature","Refrigerate for at least 2 hours or overnight","Before serving, sprinkle sugar evenly over each custard","Caramelize sugar with kitchen torch or under broiler","Let sugar harden for 1 minute before serving"}', 20, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00', 45, NULL, 'Classic French custard with caramelized sugar crust', NULL, 'Crème Brûlée', 6, NULL),
	('61a29e3e-0f02-43f8-ac7c-36fbceab03f2', '["Dark chocolate 8 oz chopped", "Heavy cream 2 cups divided", "Egg whites 4 large", "Granulated sugar 1/4 cup", "Vanilla extract 1 tsp", "Salt pinch"]', '{"Melt chocolate with 1/2 cup cream in double boiler","Stir until smooth, remove from heat and cool slightly","Whip remaining 1.5 cups cream to soft peaks, refrigerate","Beat egg whites with salt until soft peaks form","Gradually add sugar, beat until stiff peaks form","Fold cooled chocolate into egg whites gently","Fold in whipped cream until no streaks remain","Divide mousse among serving glasses","Refrigerate for at least 2 hours","Top with additional whipped cream before serving"}', 20, '2025-10-15 15:51:27.593398+00', '2025-10-15 15:51:27.593398+00', 10, NULL, 'Rich and airy dark chocolate mousse topped with whipped cream', NULL, 'Chocolate Mousse', 6, NULL),
	('4957cce4-0423-47d8-8496-c4eca3f9f592', '[{"name": "chicken legs", "unit": "whole", "order": 0, "amount": 4}, {"name": "dijon mustard", "unit": "cup", "order": 1, "amount": 0.25}, {"name": "dried herbs", "unit": "tablespoon", "order": 2, "amount": 1}, {"name": "salt", "unit": "teaspoon", "order": 3, "amount": 1}, {"name": "black pepper", "unit": "teaspoon", "order": 4, "amount": 1}, {"name": "olive oil", "unit": "tablespoons", "order": 5, "amount": 2}]', '{"Preheat oven to 425°F","Mix mustard, herbs, salt, pepper and olive oil in a bowl","Coat chicken legs thoroughly with mustard mixture","Place on baking sheet and bake for 35-40 minutes until cooked through","Let rest 5-10 minutes before serving"}', 15, '2025-10-16 00:07:32.67871+00', '2025-10-23 14:10:47.450411+00', 40, 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', 'This recipe is based on Baked Mustard-Herb Chicken Legs from the New York Times.', NULL, 'Mustard Baked Chicken', 4, 'https://seetula.com/mustard-baked-chicken/'),
	('9296e9b9-3cd2-483e-9816-ca7b53253006', '[{"name": "2 pounds skinless, boneless chicken breast meat - cut into chunks", "unit": "", "order": 0, "amount": 0}, {"name": "1.25 cups sour cream", "unit": "", "order": 1, "amount": 0}, {"name": "1 (10.5 ounce) can condensed cream of chicken soup", "unit": "", "order": 2, "amount": 0}, {"name": "0.25 teaspoon chili powder", "unit": "", "order": 3, "amount": 0}, {"name": "1 tablespoon butter", "unit": "", "order": 4, "amount": 0}, {"name": "1 small onion, chopped", "unit": "", "order": 5, "amount": 0}, {"name": "1 cup water", "unit": "", "order": 6, "amount": 0}, {"name": "1 bunch green onions, chopped, divided", "unit": "", "order": 7, "amount": 0}, {"name": "1 (4 ounce) can chopped green chiles, drained", "unit": "", "order": 8, "amount": 0}, {"name": "1 (1.25 ounce) package mild taco seasoning mix", "unit": "", "order": 9, "amount": 0}, {"name": "1 teaspoon lime juice", "unit": "", "order": 10, "amount": 0}, {"name": "0.5 teaspoon onion powder", "unit": "", "order": 11, "amount": 0}, {"name": "0.5 teaspoon garlic powder", "unit": "", "order": 12, "amount": 0}, {"name": "5 (12 inch) flour tortillas", "unit": "", "order": 13, "amount": 0}, {"name": "3 cups shredded Cheddar cheese", "unit": "", "order": 14, "amount": 0}, {"name": "1 (10 ounce) can enchilada sauce", "unit": "", "order": 15, "amount": 0}, {"name": "1 (6 ounce) can sliced black olives, drained", "unit": "", "order": 16, "amount": 0}]', '{"Place chicken into a large pot and add water to cover. Bring to a boil over high heat, then reduce the heat to medium-low, cover, and simmer until chicken is no longer pink and the juices run clear, about 10 minutes. An instant-read thermometer inserted into the center should read 165 degrees F (74 degrees C).","Remove from the pot and let sit until cool enough to handle; shred chicken with two forks.","Combine sour cream, condensed soup, and chili powder in a saucepan. Bring to a simmer over medium heat, stirring occasionally, then turn off the heat and cover to keep warm.","At the same time, melt butter in a skillet over medium heat. Add onion; cook and stir until translucent, about 5 minutes. Add shredded chicken, water, 1/2 of the green onions, green chiles, and taco seasoning; simmer for 10 minutes. Stir in lime juice, onion powder, and garlic powder; simmer for 10 more minutes.","Preheat the oven to 350 degrees F (175 degrees C).","Stir 1 cup soup mixture into the skillet with the chicken. Spread remaining soup mixture over the bottom of a 9x13-inch baking dish.","Fill each tortilla with 1/5 of the chicken mixture and about 5 tablespoons Cheddar cheese.","Roll tortillas around filling and place enchiladas, seam-side down, into the baking dish. Pour enchilada sauce over top and sprinkle with remaining Cheddar, remaining green onions, and olives.","Bake in the preheated oven until filling is heated through and cheese is melted and bubbling, about 25 minutes."}', 0, '2025-10-23 15:14:49.995533+00', '2025-10-23 15:37:42.204059+00', 0, 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', 'These creamy chicken enchiladas are stuffed with tender chicken and green chiles with enchilada sauce and cheese for an easy, family-pleasing dinner.', NULL, 'Angela''s Awesome Chicken Enchiladas', 8, 'https://www.allrecipes.com/recipe/83549/angelas-awesome-enchiladas/'),
	('6b3f8ff0-4d18-4951-a218-7d5085522281', '[{"name": "0 Comments", "unit": "", "order": 0, "amount": 0}, {"name": "3 mins read", "unit": "", "order": 0, "amount": 0}, {"name": "This bread takes about 10 hours minimum. You can start it first thing when you get up or mix the dough and let it sit overnight and bake it the next day.", "unit": "", "order": 0, "amount": 0}, {"name": "3 1/3c (400g) AP flour", "unit": "", "order": 0, "amount": 0}, {"name": "1 teaspoon yeast", "unit": "", "order": 0, "amount": 0}, {"name": "1 1/2 (11g) teaspoon salt", "unit": "", "order": 0, "amount": 0}, {"name": "1 1/2 cups warm water", "unit": "", "order": 0, "amount": 0}, {"name": "Mix all ingredients in a bowl. Cover with plastic wrap and let sit for at least 8 hours. The dough will be a big sticky mess. When it is ready there will be a lot of bubbles on the surface.", "unit": "", "order": 0, "amount": 0}, {"name": "Preheat oven to 450 with the Red Pot, including the lid, in the oven.", "unit": "", "order": 0, "amount": 0}, {"name": "Bake with lid on for 30 minutes", "unit": "", "order": 0, "amount": 0}, {"name": "Remove lid and bake an additional 15 minutes or until nicely browned.", "unit": "", "order": 0, "amount": 0}, {"name": "When you take the bread out of the oven immediately remove it from the pot and put it on a rack to cool. Let it cool at least 30 minutes before cutting into it.", "unit": "", "order": 0, "amount": 0}, {"name": "You can also mix all the ingredients together the night before. When I do it that way I use about 1/2 teaspoon of yeast.", "unit": "", "order": 0, "amount": 0}, {"name": "The Day We Met Nutmeg\n\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tAugust 10, 2025/\n\t\t\t\t\t\t\t\t\t\t\t0 Comments", "unit": "", "order": 0, "amount": 0}, {"name": "The Day a Beer Saved a Bear\n\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tJuly 30, 2025/\n\t\t\t\t\t\t\t\t\t\t\t0 Comments", "unit": "", "order": 0, "amount": 0}, {"name": "Lassen\n\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tJuly 22, 2025/\n\t\t\t\t\t\t\t\t\t\t\t0 Comments", "unit": "", "order": 0, "amount": 0}, {"name": "Ham and Lentil Soup\n\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tApril 28, 2025/\n\t\t\t\t\t\t\t\t\t\t\t0 Comments", "unit": "", "order": 0, "amount": 0}, {"name": "CranApple Mocktail\n\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\tJanuary 16, 2025/\n\t\t\t\t\t\t\t\t\t\t\t0 Comments", "unit": "", "order": 0, "amount": 0}]', '{Home>,recipes>,"Red Pot Bread","Mix all ingredients in a bowl. Cover with plastic wrap and let sit for at least 8 hours. The dough will be a big sticky mess. When it is ready there will be a lot of bubbles on the surface.","Preheat oven to 450 with the Red Pot, including the lid, in the oven.","Remove the pot from the oven and carefully place the dough in the pot. This will be messy. Coating your hands with some flour before you dig the dough out of the bowl will help a little. Be gentle. You want to preserve as many of the bubbles in the dough as possible. Remember the pot is extremely hot so be very careful.","Bake with lid on for 30 minutes","Remove lid and bake an additional 15 minutes or until nicely browned.","When you take the bread out of the oven immediately remove it from the pot and put it on a rack to cool. Let it cool at least 30 minutes before cutting into it.","I normally use AP flour. I should experiment and see how it comes out with bread flour.","You can also mix all the ingredients together the night before. When I do it that way I use about 1/2 teaspoon of yeast.","Occasionally the bread sticks to the pot. I haven’t figured out why, but here are a few things to try:

Make sure the pot is clean. If there is any food stuck to the bottom of the pot the bread will stick to it.



Remove the bread from the pot right after cooking. The bread seems to stick if it is left sitting in the pot.



Use parchment paper. If you put the dough on parchment paper about an hour before cooking you can just lift the parchment paper and put it in the pot.  I’ve had mixed luck with this approach. Sometimes the bread sticks to the parchment paper. It does make it easier to put the bread in the pot.","Make sure the pot is clean. If there is any food stuck to the bottom of the pot the bread will stick to it.","Remove the bread from the pot right after cooking. The bread seems to stick if it is left sitting in the pot.","Use parchment paper. If you put the dough on parchment paper about an hour before cooking you can just lift the parchment paper and put it in the pot.  I’ve had mixed luck with this approach. Sometimes the bread sticks to the parchment paper. It does make it easier to put the bread in the pot.","After the lid and pot come out of the oven they can stay very hot for a long time. Be very careful. Warn anyone else in the house not to touch them. You may want to come up with some kind of signal like a kitchen towel to mark the hot pot."}', 0, '2025-10-23 15:37:58.634095+00', '2025-10-23 15:37:58.634095+00', 0, 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', 'This is really just No Knead Bread, but since I make it in a red pot, it has become known as red pot bread in our house.', NULL, 'Red Pot Bread', 0, 'https://seetula.com/red-pot-bread/'),
	('98905f0e-109f-4283-aee2-e20062e2954b', '[{"name": "3/4 cup/113 grams finely chopped semisweet or bittersweet chocolate", "unit": "", "order": 0, "amount": 0}, {"name": "1/2 cup/42 grams unsweetened cocoa powder", "unit": "", "order": 1, "amount": 0}, {"name": "1 teaspoon espresso powder", "unit": "", "order": 2, "amount": 0}, {"name": "1/2 cup/113 grams unsalted butter", "unit": "", "order": 3, "amount": 0}, {"name": "2 large eggs, at room temperature", "unit": "", "order": 4, "amount": 0}, {"name": "3/4 cup/150 grams granulated sugar", "unit": "", "order": 5, "amount": 0}, {"name": "1/2 packed cup/107 grams dark brown sugar", "unit": "", "order": 6, "amount": 0}, {"name": "1 teaspoon kosher salt ", "unit": "", "order": 7, "amount": 0}, {"name": "2 teaspoons vanilla extract", "unit": "", "order": 8, "amount": 0}, {"name": "3/4 cup/90 grams all-purpose flour", "unit": "", "order": 9, "amount": 0}, {"name": "Flaky sea salt, for finishing", "unit": "", "order": 10, "amount": 0}]', '{"Heat oven to 350 degrees. Line 2 large baking sheets with parchment paper.","Put chocolate, cocoa powder and espresso powder in a small heatproof bowl or glass measuring cup. Melt butter in a skillet or saucepan over medium-low heat until bubbly but not browned, about 3 minutes, then pour over the chocolate mixture. Without stirring, let the mixture sit so the residual heat can melt the chocolate thoroughly while you whip the eggs and sugar.","Put the eggs, both sugars and kosher salt in the bowl of a stand mixer fitted with a whisk attachment. (If using a hand mixer, a large bowl will do.) Whisk on medium-high speed until the mixture is pillowy and the sugars have begun to dissolve, 3 to 5 minutes.","Stir the chocolate mixture until glossy and smooth. (If any solid pieces of chocolate remain, you can microwave the mixture in 10-second bursts until everything is melted.)","With the mixer on low speed, add the vanilla extract and then the chocolate mixture. Scrape the sides and bottom of the bowl to make sure the chocolate is evenly distributed, then add the flour and mix on low speed until only a few streaks of flour remain. To avoid overmixing, use a spatula to finish folding in the flour. The dough should be glossy and resemble a very thick brownie batter.","Using a 2-tablespoon/1-ounce scoop, scoop a heaping amount of the dough into mounds directly onto the parchment-lined baking sheets, with each portion at least 2 inches apart, yielding about 18 cookies. Work quickly to ensure the cookies stay shiny once baked.","Bake for 8 minutes until the cookies have started to spread and take on a shiny outer surface, then remove the pans from the oven and whack them on the countertop a couple times to create a cragged top. (This also helps create a fudgier consistency.) Top with flaky sea salt and return to the oven to finish baking, for another 2 minutes until shiny and slightly puffed. Cool for a couple minutes directly on the baking sheets before transferring to a wire rack to cool completely."}', 0, '2025-10-23 16:21:02.049133+00', '2025-10-23 16:21:02.049133+00', 0, 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', 'The perfect union of two of America’s most popular desserts, brownies and cookies, this recipe offers all the goodness of a brownie and bakes up in a fraction of the time. A blend of chopped chocolate, unsweetened cocoa and espresso powder lends enormous depth to the base of these cookies. The only time-intensive step in this recipe is beating the eggs and sugar, but don’t skimp on that process, as it helps the cookies rise without any baking soda or baking powder, giving them structure and shine. Banging the sheet pan on the counter 8 minutes into the baking process creates fudgy cookies and helps create that hallmark cragged surface atop a tray of brownies. Whether you’re the type of person who races to get a corner brownie or you patiently await a middle piece, these chewy brownie cookies offer all of the best textures a brownie has to offer.&nbsp;', NULL, 'Chewy Brownie Cookies', 18, 'https://cooking.nytimes.com/recipes/1025868-chewy-brownie-cookies'),
	('6e95d149-84f1-46e2-a547-55830ee56731', '[{"name": "2 ounces bourbon or rye", "unit": "", "order": 0, "amount": 0}, {"name": "1 ounce sweet vermouth", "unit": "", "order": 1, "amount": 0}, {"name": "2 dashes Angostura bitters", "unit": "", "order": 2, "amount": 0}, {"name": "Garnish: brandied cherry", "unit": "", "order": 3, "amount": 0}]', '{"Add the rye whiskey, sweet vermouth, and bitters into a mixing glass with ice and stir until well-chilled.","Strain into a chilled Nick &amp; Nora or coupe glass.","Garnish with a brandied cherry (or a lemon twist, if preferred)."}', 0, '2025-10-23 20:53:05.326294+00', '2025-10-23 20:53:05.326294+00', 0, 'ebe482b0-671e-424d-a78e-bb4e3f9dc432', 'Composed of just whiskey, sweet vermouth and bitters, the Manhattan has changed very little since its inception in the 1800s. Here&#39;s how to make one of the world&#39;s most famous cocktails.', NULL, 'Manhattan', 1, 'https://www.liquor.com/recipes/manhattan-2/');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
-- 	('menu-images', 'menu-images', NULL, '2025-10-15 15:51:27.577448+00', '2025-10-15 15:51:27.577448+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 10, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

-- SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict q5vVZGDnPp4rlBxJctMR90RgO6MyUhkpAf75euvA8lVGo9sagfXrPpdxnnH2xC2

RESET ALL;
