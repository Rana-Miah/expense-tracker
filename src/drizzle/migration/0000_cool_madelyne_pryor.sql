CREATE TABLE "assign_member_receive_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_member_trx_name_id" uuid NOT NULL,
	"family_member_receive_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_member_receive_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "assign_member_source_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_member_trx_name_id" uuid NOT NULL,
	"family_member_source_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_member_source_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "assign_receive_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_trx_name_id" uuid NOT NULL,
	"family_receive_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_receive_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "assign_source_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_trx_name_id" uuid NOT NULL,
	"family_source_bank_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "assign_source_bank_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_bank_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"balance" numeric(7, 2) NOT NULL,
	"local_bank_number" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_bank_accounts_id_unique" UNIQUE("id"),
	CONSTRAINT "family_bank_accounts_name_unique" UNIQUE("name"),
	CONSTRAINT "family_bank_accounts_local_bank_number_unique" UNIQUE("local_bank_number")
);
--> statement-breakpoint
CREATE TABLE "family_shopkeepers-bill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_shopkeeper_id" uuid NOT NULL,
	"total_debt" numeric(7, 2) NOT NULL,
	"description" text,
	"payment_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_shopkeepers-bill_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_loan_provider" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"total_debt" numeric(7, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_loan_provider_id_unique" UNIQUE("id"),
	CONSTRAINT "family_loan_provider_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_member_bank_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_member_id" uuid NOT NULL,
	"name" text NOT NULL,
	"balance" numeric(7, 2) NOT NULL,
	"local_bank_number" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_member_bank_accounts_id_unique" UNIQUE("id"),
	CONSTRAINT "family_member_bank_accounts_name_unique" UNIQUE("name"),
	CONSTRAINT "family_member_bank_accounts_local_bank_number_unique" UNIQUE("local_bank_number")
);
--> statement-breakpoint
CREATE TABLE "family_member_loan_provider" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_member_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"total_debt" numeric(7, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_member_loan_provider_id_unique" UNIQUE("id"),
	CONSTRAINT "family_member_loan_provider_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_member_trx_name" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"family_member_id" uuid NOT NULL,
	"name" text NOT NULL,
	"variant" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_member_trx_name_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_member_member_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trx_name" text NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"family_member_trx_name_id" uuid NOT NULL,
	"family_member_source_bank_id" uuid,
	"family_member_receive_bank_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_member_member_transaction_id_unique" UNIQUE("id"),
	CONSTRAINT "family_member_member_transaction_trx_name_unique" UNIQUE("trx_name")
);
--> statement-breakpoint
CREATE TABLE "family_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"relation" text NOT NULL,
	"role" text NOT NULL,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_members_id_unique" UNIQUE("id"),
	CONSTRAINT "family_members_email_unique" UNIQUE("email"),
	CONSTRAINT "family_members_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_shopkeeper" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"total_debt" numeric(7, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_shopkeeper_id_unique" UNIQUE("id"),
	CONSTRAINT "family_shopkeeper_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "family_trx_name" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"name" text NOT NULL,
	"variant" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_trx_name_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "family_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trx_name" text NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"description" text,
	"family_trx_name_id" uuid NOT NULL,
	"family_source_bank_id" uuid,
	"family_receive_bank_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_transaction_id_unique" UNIQUE("id"),
	CONSTRAINT "family_transaction_trx_name_unique" UNIQUE("trx_name")
);
--> statement-breakpoint
CREATE TABLE "family_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'FAMILY' NOT NULL,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "family_table_id_unique" UNIQUE("id"),
	CONSTRAINT "family_table_phone_unique" UNIQUE("phone"),
	CONSTRAINT "family_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "assign_member_receive_bank" ADD CONSTRAINT "assign_member_receive_bank_family_member_trx_name_id_family_member_trx_name_id_fk" FOREIGN KEY ("family_member_trx_name_id") REFERENCES "public"."family_member_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_member_receive_bank" ADD CONSTRAINT "assign_member_receive_bank_family_member_receive_bank_id_family_member_bank_accounts_id_fk" FOREIGN KEY ("family_member_receive_bank_id") REFERENCES "public"."family_member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_member_source_bank" ADD CONSTRAINT "assign_member_source_bank_family_member_trx_name_id_family_member_trx_name_id_fk" FOREIGN KEY ("family_member_trx_name_id") REFERENCES "public"."family_member_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_member_source_bank" ADD CONSTRAINT "assign_member_source_bank_family_member_source_bank_id_family_member_bank_accounts_id_fk" FOREIGN KEY ("family_member_source_bank_id") REFERENCES "public"."family_member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_receive_bank" ADD CONSTRAINT "assign_receive_bank_family_trx_name_id_family_trx_name_id_fk" FOREIGN KEY ("family_trx_name_id") REFERENCES "public"."family_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_receive_bank" ADD CONSTRAINT "assign_receive_bank_family_receive_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_receive_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_source_bank" ADD CONSTRAINT "assign_source_bank_family_trx_name_id_family_trx_name_id_fk" FOREIGN KEY ("family_trx_name_id") REFERENCES "public"."family_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_source_bank" ADD CONSTRAINT "assign_source_bank_family_source_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_source_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_bank_accounts" ADD CONSTRAINT "family_bank_accounts_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-bill" ADD CONSTRAINT "family_shopkeepers-bill_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-bill" ADD CONSTRAINT "family_shopkeepers-bill_family_shopkeeper_id_family_shopkeeper_id_fk" FOREIGN KEY ("family_shopkeeper_id") REFERENCES "public"."family_shopkeeper"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_loan_provider" ADD CONSTRAINT "family_loan_provider_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_bank_accounts" ADD CONSTRAINT "family_member_bank_accounts_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_bank_accounts" ADD CONSTRAINT "family_member_bank_accounts_family_member_id_family_members_id_fk" FOREIGN KEY ("family_member_id") REFERENCES "public"."family_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_loan_provider" ADD CONSTRAINT "family_member_loan_provider_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_loan_provider" ADD CONSTRAINT "family_member_loan_provider_family_member_id_family_members_id_fk" FOREIGN KEY ("family_member_id") REFERENCES "public"."family_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_trx_name" ADD CONSTRAINT "family_member_trx_name_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_trx_name" ADD CONSTRAINT "family_member_trx_name_family_member_id_family_members_id_fk" FOREIGN KEY ("family_member_id") REFERENCES "public"."family_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_member_transaction" ADD CONSTRAINT "family_member_member_transaction_family_member_trx_name_id_family_member_trx_name_id_fk" FOREIGN KEY ("family_member_trx_name_id") REFERENCES "public"."family_member_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_member_transaction" ADD CONSTRAINT "family_member_member_transaction_family_member_source_bank_id_family_member_bank_accounts_id_fk" FOREIGN KEY ("family_member_source_bank_id") REFERENCES "public"."family_member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_member_member_transaction" ADD CONSTRAINT "family_member_member_transaction_family_member_receive_bank_id_family_member_bank_accounts_id_fk" FOREIGN KEY ("family_member_receive_bank_id") REFERENCES "public"."family_member_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_shopkeeper" ADD CONSTRAINT "family_shopkeeper_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_trx_name" ADD CONSTRAINT "family_trx_name_family_id_family_table_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD CONSTRAINT "family_transaction_family_trx_name_id_family_trx_name_id_fk" FOREIGN KEY ("family_trx_name_id") REFERENCES "public"."family_trx_name"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD CONSTRAINT "family_transaction_family_source_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_source_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD CONSTRAINT "family_transaction_family_receive_bank_id_family_bank_accounts_id_fk" FOREIGN KEY ("family_receive_bank_id") REFERENCES "public"."family_bank_accounts"("id") ON DELETE no action ON UPDATE no action;