ALTER TABLE "family_bank_accounts" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-bill" ADD COLUMN "isCancel" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_shopkeepers-bill" ADD COLUMN "cancel_reason" text;--> statement-breakpoint
ALTER TABLE "family_loan_provider" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_member_bank_accounts" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_member_loan_provider" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_member_trx_name" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_member_member_transaction" ADD COLUMN "isCancel" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_member_member_transaction" ADD COLUMN "cancel_reason" text;--> statement-breakpoint
ALTER TABLE "family_members" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_shopkeeper" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_trx_name" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD COLUMN "isCancel" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "family_transaction" ADD COLUMN "cancel_reason" text;