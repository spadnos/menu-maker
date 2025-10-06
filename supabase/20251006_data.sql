SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict JrMv4xWOqo53uk9eRIxYErhNlYrEMB6cv5eXfbMU4zTfpc3Npd9Civ9Llb9B1dV

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
	('00000000-0000-0000-0000-000000000000', 'aa167139-651f-417d-abb8-515cfa88b2c8', '{"action":"user_signedup","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-29 23:53:13.900453+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9bd1d6e-5bb2-494a-ae0f-d17a01b74563', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-29 23:53:13.902468+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c85d46b-a658-4589-adcc-497e15baf7de', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 01:39:05.45286+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1be5d53-922d-45f6-b717-307997bb0f7b', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 01:39:05.454254+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dabaa8e3-9e8c-4e94-a655-136cdb14e309', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 12:44:16.886146+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e142b2b2-182d-4d3b-b505-4b0a5cad4cfc', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 12:44:16.889718+00', ''),
	('00000000-0000-0000-0000-000000000000', '274485fd-3e33-4a7f-b1e4-7585761902d1', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 13:42:37.048635+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ce74ef7-3a9c-4353-b9e1-dbbad2548ca5', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 13:42:37.057262+00', ''),
	('00000000-0000-0000-0000-000000000000', 'feefb0c8-4f4f-4e72-a110-4ec4b47961d0', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 15:00:44.506225+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de3efabe-024a-4875-8e3a-4f3de23af5b1', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 15:00:44.516707+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b702dc3c-c6f7-4e48-b95a-713d0c2e8436', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 15:59:00.106473+00', ''),
	('00000000-0000-0000-0000-000000000000', '01b909a2-07b8-446d-ad95-f8254cdf6085', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 15:59:00.1084+00', ''),
	('00000000-0000-0000-0000-000000000000', '32e37fef-63bf-4bf0-906b-50f1d13982fd', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 21:17:28.993108+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ca4a7c4-b47f-4d5a-8f08-0f1a7c496879', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 21:17:28.993852+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea97696e-d784-48dd-94a8-215906384e69', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 22:15:43.794898+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ff8563d-f247-4119-a782-1d296745a385', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 22:15:43.796039+00', ''),
	('00000000-0000-0000-0000-000000000000', '1bfd868c-03a4-4ea2-816a-f092aebcf3c1', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 23:16:13.59712+00', ''),
	('00000000-0000-0000-0000-000000000000', '384b4022-cd49-4d61-9f51-1dd8ce4ea1d3', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-30 23:16:13.597994+00', ''),
	('00000000-0000-0000-0000-000000000000', '74a63d3f-aa96-45d6-b2a7-1070812bbb70', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-30 23:31:23.09094+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ce3e22b-7f36-41c1-8311-e1e11a7a0820', '{"action":"logout","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-01 00:09:59.105706+00', ''),
	('00000000-0000-0000-0000-000000000000', '18139035-0613-453e-a16a-be48b4b3ff2f', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-01 00:10:08.200324+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4b1f6ad-a3b3-4911-9cd7-6a488d10065b', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-01 00:13:46.359126+00', ''),
	('00000000-0000-0000-0000-000000000000', '47335bc5-44a2-4418-88bc-d0d31eab547c', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-01 00:15:02.953975+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2ccec09-de7f-4e47-a308-bceee4ae13b8', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-01 00:20:12.548357+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae10c20b-dc1d-4f66-beb3-9102d0f0595c', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 13:16:28.366315+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f3d926c-7a48-4eec-a986-5b94d246f820', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 13:16:28.36796+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c1ac8f2-f0f0-4482-a8bc-ed9b66778dfc', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 14:38:12.249072+00', ''),
	('00000000-0000-0000-0000-000000000000', '3547f740-7965-4c2b-9926-69eda84ac1b2', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 14:38:12.250087+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec2ec32a-3b0a-40b2-981f-4d01a8680828', '{"action":"logout","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-01 14:59:05.726344+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b8197a5-4785-45e8-b440-36c20392e3aa', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-01 15:00:05.476773+00', ''),
	('00000000-0000-0000-0000-000000000000', '65d6d336-eaff-4cce-ae0c-40d3d830e283', '{"action":"logout","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-01 15:09:55.574009+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0d71286-deeb-479b-8c51-606a2e0db901', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-01 15:10:47.556611+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa36e829-1be4-4c5f-92c6-6e05809d030f', '{"action":"logout","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-01 15:14:43.716655+00', ''),
	('00000000-0000-0000-0000-000000000000', '53f17553-bf62-49f2-8a9e-9ceb15b9b49f', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-01 15:14:59.309944+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac770192-be02-4967-99a1-ead70f701954', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 16:18:50.759254+00', ''),
	('00000000-0000-0000-0000-000000000000', '7131d620-0c82-4685-9b83-187960243181', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 16:18:50.760408+00', ''),
	('00000000-0000-0000-0000-000000000000', 'edb2fd78-3448-4d96-906c-45367c3596e7', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 13:09:37.655106+00', ''),
	('00000000-0000-0000-0000-000000000000', '7df6ee99-1189-424d-92c9-8738fff37244', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 13:09:37.661639+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8bf2548-83ad-4983-832b-a1aac7c2ab51', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 14:59:18.056757+00', ''),
	('00000000-0000-0000-0000-000000000000', '76920fa9-f67f-420b-98b8-67043737cd71', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 14:59:18.057763+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd93790e2-6380-44f7-b690-7e7ffc7d52d3', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 17:11:28.665679+00', ''),
	('00000000-0000-0000-0000-000000000000', '68ccee57-cf64-4dd6-90b4-b44d1b5549d7', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 17:11:28.666453+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa00e03a-8e6d-49fa-bfd7-75df1940d5bb', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 18:10:26.191222+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0852cfd-d034-4da5-adca-af9aa0994150', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 18:10:26.192258+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b4417ef-f9b5-4d24-82c2-9668db87ca76', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 20:19:57.013532+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ecda519-bf84-4ba3-ae23-1c26fc769404', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 20:19:57.01629+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dbc9e5f4-d33c-448b-b9a4-8b6b0ce53d9b', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 17:19:20.506118+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f697e195-e68a-4e77-a41d-70480088d51f', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 17:19:20.507215+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7a3bb91-a595-44c8-9724-557ed93ff727', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 22:25:13.142906+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a87bde04-4795-4fc5-a9c7-bf7806fb9f56', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 22:25:13.143629+00', ''),
	('00000000-0000-0000-0000-000000000000', '996dde20-8074-46a1-8adb-fdd486bca032', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 23:39:48.104655+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a0e1fa7-b94a-44f7-ac3c-985c2101448f', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-01 23:39:48.105617+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4ab9587-6011-4ade-8dea-b1d15b458f73', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 22:41:56.364404+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cfcfabbd-1d60-4253-88d6-6a7ffbca3cd3', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 22:41:56.367311+00', ''),
	('00000000-0000-0000-0000-000000000000', '11019040-d1a8-41f7-8bb6-73946109d550', '{"action":"token_refreshed","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 23:40:38.189076+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e95860f2-cbe1-43ec-be5c-ad2330bbfc9d', '{"action":"token_revoked","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-10-02 23:40:38.190954+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cbb941f4-d8f2-4f57-bac6-9ce89b3123f2', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-03 14:38:29.238117+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a168186-1380-41cc-b90a-f2266ea4faac', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-03 16:04:34.274737+00', ''),
	('00000000-0000-0000-0000-000000000000', '8295143c-b5cd-4100-b015-23521221f7f6', '{"action":"logout","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-03 16:34:04.679092+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fd827bb-78bc-446a-8283-eb18d6a41a2f', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-03 16:34:21.910209+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d3d2b1f-87fc-46c0-b3e8-85a7de5ab111', '{"action":"logout","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-03 16:34:50.84448+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7c2780c-cf2a-4535-b60f-d9700774a1a5', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-03 16:41:25.06814+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9c237ca-38ff-4268-b1f4-7b359389e271', '{"action":"logout","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-10-03 17:18:57.902837+00', ''),
	('00000000-0000-0000-0000-000000000000', '40db9b4e-3e2f-4599-a838-f970d59cd457', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-03 17:19:45.585088+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dad277c-0310-4043-b354-28c60b3242e7', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-03 22:24:12.840435+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7ec240a-28d5-4ec6-a49d-983f7c33ba23', '{"action":"login","actor_id":"fec1985a-690c-45cf-b92c-37a824e175dc","actor_username":"spadnos@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-10-06 16:39:14.682058+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'fec1985a-690c-45cf-b92c-37a824e175dc', 'authenticated', 'authenticated', 'spadnos@gmail.com', '$2a$10$NTlbLNnhM8uE2BY81miKI.kui80sg4tqW9ZAVYEXAtJ45k3PapIJS', '2025-09-29 23:53:13.901024+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-10-06 16:39:14.683447+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "fec1985a-690c-45cf-b92c-37a824e175dc", "email": "spadnos@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-29 23:53:13.888819+00', '2025-10-06 16:39:14.68546+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('fec1985a-690c-45cf-b92c-37a824e175dc', 'fec1985a-690c-45cf-b92c-37a824e175dc', '{"sub": "fec1985a-690c-45cf-b92c-37a824e175dc", "email": "spadnos@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-09-29 23:53:13.899125+00', '2025-09-29 23:53:13.899144+00', '2025-09-29 23:53:13.899144+00', '5b40b3d5-570f-47c5-967e-b38d1b6bac46');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id") VALUES
	('14f32fcd-6db2-43c6-9acc-3ba9614095ad', 'fec1985a-690c-45cf-b92c-37a824e175dc', '2025-10-03 17:19:45.585554+00', '2025-10-03 17:19:45.585554+00', NULL, 'aal1', NULL, NULL, 'node', '172.217.12.138', NULL, NULL),
	('960f73ed-4d75-4ec2-915f-570f9c2e999b', 'fec1985a-690c-45cf-b92c-37a824e175dc', '2025-10-03 22:24:12.841088+00', '2025-10-03 22:24:12.841088+00', NULL, 'aal1', NULL, NULL, 'node', '142.250.68.10', NULL, NULL),
	('6c27a4d7-a67d-4ea4-853f-87b004a40829', 'fec1985a-690c-45cf-b92c-37a824e175dc', '2025-10-06 16:39:14.6835+00', '2025-10-06 16:39:14.6835+00', NULL, 'aal1', NULL, NULL, 'node', '142.250.68.10', NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('14f32fcd-6db2-43c6-9acc-3ba9614095ad', '2025-10-03 17:19:45.586748+00', '2025-10-03 17:19:45.586748+00', 'password', 'f5c69871-9ef3-4978-a568-20c071e41fe2'),
	('960f73ed-4d75-4ec2-915f-570f9c2e999b', '2025-10-03 22:24:12.8423+00', '2025-10-03 22:24:12.8423+00', 'password', '4383295b-f4ff-494c-947e-c6404689ae1e'),
	('6c27a4d7-a67d-4ea4-853f-87b004a40829', '2025-10-06 16:39:14.685634+00', '2025-10-06 16:39:14.685634+00', 'password', 'faf61fee-0c08-4571-b0af-a5688051be13');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 35, 'zpbpirokkqv3', 'fec1985a-690c-45cf-b92c-37a824e175dc', false, '2025-10-03 17:19:45.586143+00', '2025-10-03 17:19:45.586143+00', NULL, '14f32fcd-6db2-43c6-9acc-3ba9614095ad'),
	('00000000-0000-0000-0000-000000000000', 36, 'anqdta3iruug', 'fec1985a-690c-45cf-b92c-37a824e175dc', false, '2025-10-03 22:24:12.841664+00', '2025-10-03 22:24:12.841664+00', NULL, '960f73ed-4d75-4ec2-915f-570f9c2e999b'),
	('00000000-0000-0000-0000-000000000000', 37, '2ghiva6bpnxw', 'fec1985a-690c-45cf-b92c-37a824e175dc', false, '2025-10-06 16:39:14.68436+00', '2025-10-06 16:39:14.68436+00', NULL, '6c27a4d7-a67d-4ea4-853f-87b004a40829');


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
	('711e7e5f-dd9e-43a8-a127-07a8db4d3ec3', 'Appetizers', 0, '2025-09-29 21:04:43.656971+00'),
	('8490fb26-ad10-4ca2-a02b-cd9f64188786', 'Entrees', 1, '2025-09-29 21:04:43.656971+00'),
	('4bb1d78f-3c69-4f24-b07b-e008547cca49', 'Desserts', 2, '2025-09-29 21:04:43.656971+00'),
	('4a945ec8-758c-4099-be52-c3d09e041905', 'Beverages', 3, '2025-09-29 21:04:43.656971+00'),
	('b3eae698-3f89-4325-a8c2-548c6bfe6dc6', 'Sides', 4, '2025-09-29 21:04:43.656971+00');


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."menu_items" ("id", "name", "description", "category_id", "image_url", "created_at", "updated_at") VALUES
	('b39307ac-0b70-4d5e-98b8-1313cd58147a', 'Bruschetta', 'Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil', '711e7e5f-dd9e-43a8-a127-07a8db4d3ec3', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Bruschetta', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('d8629fd3-2cfc-49a6-a8a6-05d9b2a5753f', 'French Onion Soup', 'Classic soup with caramelized onions, beef broth, and melted Gruyère cheese', '711e7e5f-dd9e-43a8-a127-07a8db4d3ec3', 'https://placehold.co/600x400/e8d5b7/8b4513?text=French+Onion+Soup', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('90817a0f-a05d-4e58-8dc1-5052702c40b7', 'Escargots de Bourgogne', 'Burgundy snails baked in garlic-parsley butter', '711e7e5f-dd9e-43a8-a127-07a8db4d3ec3', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Escargots', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('12bcf577-d578-4250-bc83-9e5c28c78830', 'Grilled Salmon', 'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables', '8490fb26-ad10-4ca2-a02b-cd9f64188786', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Grilled+Salmon', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('e95a72ff-25b7-47be-a51f-57d19a46b0ee', 'Coq au Vin', 'Traditional French chicken braised in red wine with mushrooms, onions, and bacon', '8490fb26-ad10-4ca2-a02b-cd9f64188786', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Coq+au+Vin', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('90fdbcd1-5179-4789-af1e-8b5642d797d3', 'Beef Bourguignon', 'Tender beef slow-cooked in red wine with carrots, pearl onions, and herbs', '8490fb26-ad10-4ca2-a02b-cd9f64188786', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Beef+Bourguignon', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('906b95d0-745a-49fe-b260-f9735bf499be', 'Ratatouille', 'Provençal vegetable stew with eggplant, zucchini, peppers, and tomatoes', '8490fb26-ad10-4ca2-a02b-cd9f64188786', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Ratatouille', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('0d7119ea-4e69-4e63-b827-b445d38c5e90', 'Duck Confit', 'Slow-cooked duck leg with crispy skin, served with roasted potatoes', '8490fb26-ad10-4ca2-a02b-cd9f64188786', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Duck+Confit', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('9a76650c-1e92-440d-9443-9d432ebcf304', 'Crème Brûlée', 'Classic French custard with caramelized sugar crust', '4bb1d78f-3c69-4f24-b07b-e008547cca49', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Creme+Brulee', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('3e7350ac-fff2-4d3f-83fd-9db5f78b9f5c', 'Chocolate Mousse', 'Rich and airy dark chocolate mousse topped with whipped cream', '4bb1d78f-3c69-4f24-b07b-e008547cca49', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Chocolate+Mousse', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('dc04db86-c4cd-426f-9f14-6dd5a6da5af2', 'Tarte Tatin', 'Upside-down caramelized apple tart served warm with vanilla ice cream', '4bb1d78f-3c69-4f24-b07b-e008547cca49', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Tarte+Tatin', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('cb484043-306f-4569-8ad9-8105b0a214e1', 'Profiteroles', 'Cream puffs filled with vanilla ice cream, drizzled with warm chocolate sauce', '4bb1d78f-3c69-4f24-b07b-e008547cca49', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Profiteroles', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('c002020f-53df-4835-b8e4-5c695104494c', 'House Red Wine', 'Carefully selected French red wine, perfect pairing for our entrees', '4a945ec8-758c-4099-be52-c3d09e041905', NULL, '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('1c24c336-4d82-4924-b8ae-1e25ccb7e50a', 'House White Wine', 'Crisp and refreshing French white wine', '4a945ec8-758c-4099-be52-c3d09e041905', NULL, '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('1b35b5f5-23dd-4885-9732-e306de5310fd', 'Espresso', 'Rich Italian espresso, the perfect end to your meal', '4a945ec8-758c-4099-be52-c3d09e041905', NULL, '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('707257a0-eea7-4a58-91f8-b73ac0763dba', 'French Press Coffee', 'Freshly brewed French press coffee', '4a945ec8-758c-4099-be52-c3d09e041905', NULL, '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('c70f307a-d19c-45d9-b6c8-ac6f217cc9a4', 'Pommes Frites', 'Crispy French fries with sea salt', 'b3eae698-3f89-4325-a8c2-548c6bfe6dc6', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Pommes+Frites', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('cc485dbc-9751-41f8-8475-8d55e8375fa4', 'Haricots Verts', 'Fresh green beans sautéed with garlic and butter', 'b3eae698-3f89-4325-a8c2-548c6bfe6dc6', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Haricots+Verts', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00'),
	('b679accc-55d6-484d-aa0c-dc6af9e51a52', 'Gratin Dauphinois', 'Creamy potato gratin with Gruyère cheese', 'b3eae698-3f89-4325-a8c2-548c6bfe6dc6', 'https://placehold.co/600x400/e8d5b7/8b4513?text=Gratin+Dauphinois', '2025-09-29 21:04:43.656971+00', '2025-09-29 21:04:43.656971+00');


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."recipes" ("id", "ingredients", "instructions", "prep_time_mins", "created_at", "updated_at", "name", "cook_time_mins", "description", "image_url", "servings", "created_by") VALUES
	('20902aca-9450-4e48-8c9f-b39e36e47a96', '[{"name": "Dark chocolate", "amount": "8 oz, chopped"}, {"name": "Heavy cream", "amount": "2 cups, divided"}, {"name": "Egg whites", "amount": "4 large"}, {"name": "Granulated sugar", "amount": "1/4 cup"}, {"name": "Vanilla extract", "amount": "1 tsp"}, {"name": "Salt", "amount": "pinch"}]', '{"Melt chocolate with 1/2 cup cream in double boiler","Stir until smooth, remove from heat and cool slightly","Whip remaining 1.5 cups cream to soft peaks, refrigerate","Beat egg whites with salt until soft peaks form","Gradually add sugar, beat until stiff peaks form","Fold cooled chocolate into egg whites gently","Fold in whipped cream until no streaks remain","Divide mousse among serving glasses","Refrigerate for at least 2 hours","Top with additional whipped cream before serving"}', 30, '2025-09-29 21:04:43.656971+00', '2025-09-30 21:21:47.816455+00', 'Chocolate Mousse', NULL, NULL, NULL, NULL, NULL),
	('3ad2ffb4-383f-4e5d-b09e-5fcf3d081a66', '[{"name": "Chicken thighs and drumsticks", "amount": "3 lbs"}, {"name": "Bacon", "amount": "6 oz, diced"}, {"name": "Pearl onions", "amount": "12 oz"}, {"name": "Mushrooms", "amount": "8 oz, quartered"}, {"name": "Red wine", "amount": "2 cups"}, {"name": "Chicken stock", "amount": "1 cup"}, {"name": "Tomato paste", "amount": "2 tbsp"}, {"name": "Garlic cloves", "amount": "4, minced"}, {"name": "Fresh thyme", "amount": "4 sprigs"}, {"name": "Bay leaves", "amount": "2"}, {"name": "Flour", "amount": "2 tbsp"}, {"name": "Butter", "amount": "2 tbsp"}]', '{"Season chicken pieces with salt and pepper","In a large Dutch oven, cook bacon until crispy, remove and set aside","Brown chicken in bacon fat, remove and set aside","Sauté pearl onions until golden, remove and set aside","Sauté mushrooms until browned, remove and set aside","Add garlic and cook for 1 minute","Stir in flour and tomato paste","Add wine, scraping up browned bits","Add chicken stock, thyme, and bay leaves","Return chicken and bacon to pot","Cover and simmer for 45 minutes","Add onions and mushrooms, simmer 15 more minutes","Remove thyme sprigs and bay leaves","Stir in butter until melted","Serve hot with crusty bread or mashed potatoes"}', 90, '2025-09-29 21:04:43.656971+00', '2025-09-30 13:20:46.249147+00', 'Chicken Something', NULL, NULL, NULL, NULL, NULL),
	('49673135-810f-4a3f-8b94-bfbcff0db27a', '[{"name": "Fresh Atlantic salmon fillet", "amount": "6 oz"}, {"name": "Olive oil", "amount": "2 tbsp"}, {"name": "Lemon juice", "amount": "1 tbsp"}, {"name": "Butter", "amount": "2 tbsp"}, {"name": "Fresh dill", "amount": "1 tbsp chopped"}, {"name": "Salt and pepper", "amount": "to taste"}]', '{"Preheat grill to medium-high heat (400°F)","Pat salmon dry and brush with olive oil","Season both sides with salt and pepper","Place salmon skin-side down on grill","Grill for 4-5 minutes per side until flaky","Meanwhile, melt butter and mix with lemon juice and dill","Remove salmon from grill and drizzle with lemon butter","Serve immediately with seasonal vegetables"}', 25, '2025-09-29 21:04:43.656971+00', '2025-09-30 13:20:56.852179+00', 'Salmon Something', NULL, NULL, NULL, NULL, NULL),
	('73e25ce0-efe6-4d9a-b470-4cdfa386b148', '[{"name": "Eggplant", "amount": "1 medium, diced"}, {"name": "Zucchini", "amount": "2 medium, diced"}, {"name": "Bell peppers", "amount": "2, diced"}, {"name": "Tomatoes", "amount": "4 large, diced"}, {"name": "Onion", "amount": "1 large, diced"}, {"name": "Garlic cloves", "amount": "4, minced"}, {"name": "Olive oil", "amount": "1/4 cup"}, {"name": "Fresh basil", "amount": "1/4 cup, chopped"}, {"name": "Fresh thyme", "amount": "2 tsp"}, {"name": "Salt and pepper", "amount": "to taste"}]', '{"Salt eggplant and let sit for 30 minutes to remove bitterness","Rinse and pat dry eggplant","Heat olive oil in large pan over medium heat","Sauté onion until softened, about 5 minutes","Add garlic and cook for 1 minute","Add eggplant and cook for 5 minutes","Add zucchini and peppers, cook for 5 minutes","Add tomatoes, thyme, salt, and pepper","Reduce heat and simmer uncovered for 30 minutes","Stir occasionally until vegetables are tender","Stir in fresh basil just before serving","Serve hot or at room temperature"}', 75, '2025-09-29 21:04:43.656971+00', '2025-09-30 13:21:06.148104+00', 'Eggplant Something', NULL, NULL, NULL, NULL, NULL),
	('2dd8e503-6ef3-48f8-b008-cf78c1442738', '["2 oz Gin", "3 oz tonic", "1/4 lime"]', '{"Fill glass with ice","Add all ingredients",Stir}', 0, '2025-10-01 00:28:43.606633+00', '2025-10-01 17:24:21.679126+00', 'Gin & Tonic', 0, '', NULL, 0, 'fec1985a-690c-45cf-b92c-37a824e175dc'),
	('813f1afa-c0b4-48c5-880a-2b9a813d4a78', '["2 oz bourbon or rye", "1 oz sweet vermouth (recommend Carpano Antica)", "1-2 dashes aromatic bitters (recommend Angustora or or Peychaud''s)", "2 cocktail cherries (recommend Luxardo)"]', '{"Add ingredients to cocktail shaker","Add 5-6 ice cubes","Swirl for at least 20 seconds","Strain into glass","Garnish with cherries"}', 0, '2025-10-01 00:25:48.467749+00', '2025-10-01 23:58:58.577776+00', 'Manhattan', 0, 'A classic for good reason.

I prefer a high rye bourbon.', NULL, 0, 'fec1985a-690c-45cf-b92c-37a824e175dc'),
	('399d8045-6dcc-48b6-bfe6-1f2548cecffa', '["1 package pork tenderloin", "Pork rub", "BBQ Sauce"]', '{"Preheat smoker to 225F","Spinkle pork generously with rub","Put pork on grill and cook until pork reaches 135F, about 1 hour","Baste pork with BBQ sauce","Return pork to smoker and cook until it reaches 145F"}', 0, '2025-10-02 13:20:14.560291+00', '2025-10-02 13:24:45.216171+00', 'Smoked Pork Tenderloin', 0, '', NULL, 0, 'fec1985a-690c-45cf-b92c-37a824e175dc'),
	('744c5b26-c5b2-4255-a901-ba372d704b74', '["Beef", "Carrots", "Potatoes", "Celery", "Parsley", "Beef broth", "Tomato paste", "Soy sauce", "Thyme", "Bay leaves", "Tabasco", "Tapioca"]', '{"Combine all ingredients in slow cooker.","Cook on low for 8-10 hours","Remove bay leaves","Add peas and cook for about 10-15 minutes until the peas are warm"}', 0, '2025-10-03 14:42:30.077384+00', '2025-10-03 14:42:30.077384+00', 'Slow Cooker Beef Stew', 0, 'Simple, hearty, and heavy on the veggies. ', NULL, 0, 'fec1985a-690c-45cf-b92c-37a824e175dc'),
	('a2546868-97b4-4476-8c2a-9f40b9c02403', '["1 large head of broccoli", "1/2 red onion thinly sliced", "1/2 cup dried cranberries", "1/3 cup crumbled bacon", "1/2 cup mayonnaise", "1.5 tablespoons cider vinegar", "1/2 teaspoon black pepper"]', '{"Chop the broccoli florets and dice the stems.","Combine broccoli, onions, cranberries in a large bowl.","Whisk the mayonnaise, cider, and pepper in a small bowl.","Add the dressing to the broccoli and mix. Add the bacon and mix to combine.","Refrigerate for at 1 hour before serving."}', 0, '2025-10-06 16:45:32.345705+00', '2025-10-06 16:45:32.345705+00', 'Broccoli Slaw', 0, '', NULL, 0, 'fec1985a-690c-45cf-b92c-37a824e175dc');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('menu-images', 'menu-images', NULL, '2025-09-29 21:04:43.646588+00', '2025-09-29 21:04:43.646588+00', true, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 37, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict JrMv4xWOqo53uk9eRIxYErhNlYrEMB6cv5eXfbMU4zTfpc3Npd9Civ9Llb9B1dV

RESET ALL;
