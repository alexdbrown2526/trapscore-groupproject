SELECT 
  "squad_trap"."id" as "squad_trap_id",
  "shooter_event"."id" as "shooter_event_id" FROM "squad_trap"
JOIN "squad" ON "squad_trap"."squad_id" = "squad"."id"
JOIN "shooter_squad" ON "squad"."id" = "shooter_squad"."squad_id"
JOIN "event" ON "squad"."event_id" = "event"."id"	
JOIN "shooter_event" ON "event"."id" = "shooter_event"."event_id"
JOIN "shooter" ON "shooter_event"."shooter_id" = "shooter"."id" AND "shooter_squad"."shooter_id" = "shooter"."id"
;