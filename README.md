## Quantity Measurement App

A Node.js and Express REST API that performs arithmetic, comparison, and conversion operations on physical quantities like length, weight, temperature, and volume. It includes JWT authentication and persistent history tracking.

## Features
- Add, subtract, multiply, divide quantities
- Compare two quantities
- Convert between units
- Add and subtract quantities with a specific target unit result
- Secure User Registration and Login
- View and filter history of all operations
- Schema-based request validation

## Supported Units
- **Length** — Kilometer (km), Meter (m), Centimeter (cm), Millimeter (mm)
- **Weight** — Kilogram (kg), Gram (g), Milligram (mg)
- **Volume** — Liter (l), Milliliter (ml)
- **Temperature** — Celsius (C), Fahrenheit (F), Kelvin (K)

## POST
- `/auth/register` — Register a new user
- `/auth/login` — Login and receive JWT token
- `/api/add` — Add two quantities
- `/api/add-with-target-unit` — Add two quantities and get the result in a target unit
- `/api/subtract` — Subtract two quantities
- `/api/subtract-with-target-unit` — Subtract two quantities and get the result in a target unit
- `/api/multiply` — Multiply two numbers
- `/api/divide` — Divide two numbers
- `/api/compare` — Compare two quantities
- `/api/convert` — Convert a quantity to target unit

## GET
- `/api/history` — Get all operation history
- `/api/history/type/{type}` — Filter history by measurement type (e.g., LENGTH, WEIGHT)
- `/api/history/operation/{operation}` — Filter history by operation (e.g., ADD, CONVERT)
- `/api/history/errored` — Get all failed operations
- `/api/count/{operation}` — Get the total count of a specific operation
