# SupplAI Wise

This folder contains demo seed files for **SupplAI Wise**, an AI-powered logistics dashboard focused on:

- inventory visibility
- shipment tracking
- delay prediction
- stockout forecasting
- alerting and operational decision support

These CSV files are designed for a hackathon MVP and can be imported into Supabase, PostgreSQL, or transformed into JSON for local development.

## Files included

- `users.csv` — demo users with `admin` and `operator` roles
- `warehouses.csv` — 3 warehouse / depot locations in Jamaica
- `inventory_items.csv` — 15 seeded inventory items
- `shipments.csv` — 6 seeded shipments with statuses and ETA data
- `shipment_items.csv` — join table linking inventory items to shipments
- `shipment_location_logs.csv` — simulated GPS/location history for active shipments
- `alerts.csv` — low-stock, delay, and stockout-risk alerts
- `ai_predictions.csv` — mock outputs from ETA, delay-risk, and stockout models

## Suggested import order

1. `users.csv`
2. `warehouses.csv`
3. `inventory_items.csv`
4. `shipments.csv`
5. `shipment_items.csv`
6. `shipment_location_logs.csv`
7. `alerts.csv`
8. `ai_predictions.csv`

## Recommended relational mapping

### users
| column | notes |
|---|---|
| `user_id` | primary key |
| `email` | unique |
| `role` | `admin` or `operator` |

### warehouses
| column | notes |
|---|---|
| `warehouse_id` | primary key |
| `manager_user_id` | foreign key -> `users.user_id` |

### inventory_items
| column | notes |
|---|---|
| `item_id` | primary key |
| `warehouse_id` | foreign key -> `warehouses.warehouse_id` |

### shipments
| column | notes |
|---|---|
| `shipment_id` | primary key |
| `origin_warehouse_id` | foreign key -> `warehouses.warehouse_id` |

### shipment_items
| column | notes |
|---|---|
| `shipment_item_id` | primary key |
| `shipment_id` | foreign key -> `shipments.shipment_id` |
| `item_id` | foreign key -> `inventory_items.item_id` |

### shipment_location_logs
| column | notes |
|---|---|
| `log_id` | primary key |
| `shipment_id` | foreign key -> `shipments.shipment_id` |

### alerts
| column | notes |
|---|---|
| `alert_id` | primary key |
| `related_entity_id` | foreign key-like reference depending on `related_entity_type` |

### ai_predictions
| column | notes |
|---|---|
| `prediction_id` | primary key |
| `shipment_id` | foreign key -> `shipments.shipment_id` |

## Demo scenario included

The seeded data tells a presentation-friendly story:

- `TRK-101` is moving from Kingston to Montego Bay
- it carries **Bottled Water**, **Medical Kits**, and **Food Packs**
- the shipment has **high delay risk**
- inventory for **Bottled Water** at `WH-001` is already below threshold
- the system raises a **critical stockout warning**
- `TRK-104` is a separate delayed shipment with weather / road issues
- `ITM-012` and `ITM-015` are pre-seeded as low-stock items

## AI integration ports these files support

These CSVs work well with provider-agnostic AI service ports such as:

- `predictETA(shipmentId, routeFeatures) -> etaMinutes`
- `predictDelayRisk(shipmentId, routeFeatures) -> riskScore`
- `forecastStockout(itemId, inventoryFeatures, etaFeatures) -> hoursToStockout`
- `answerAssistantQuery(question, context) -> response`

The `ai_predictions.csv` file currently contains **mock model outputs** that can be replaced later by:
- OpenAI-backed tools
- Gemini integrations
- Anthropic integrations
- custom REST inference endpoints
- local Python model services

## Fast import tip

For a quick hackathon setup:
- import these CSVs into Supabase tables with matching names
- keep the IDs as strings instead of integer auto-increment fields
- seed the frontend directly from the database
- use `shipment_location_logs` to animate map movement
- use `alerts` and `ai_predictions` to populate dashboard cards immediately

## Notes

- Timestamps are in UTC ISO 8601 format.
- Coordinates are approximate and intended for demo use.
- Passwords are not real auth credentials; `password_hint` is only there for local/demo seeding.
- `delay_risk` values in `shipments.csv` are summarized labels, while `ai_predictions.csv` stores model outputs and confidence scores.

## Example SQL table names

You can keep the same filenames as table names:

```sql
users
warehouses
inventory_items
shipments
shipment_items
shipment_location_logs
alerts
ai_predictions
```

## Example assistant questions for the demo

- Where is shipment TRK-101?
- Which items are low in stock?
- What shipment is most at risk?
- What inventory will run out first?
- Which shipment should be prioritized today?
"# supplai-wise-app" 
