# Centralized Data Structure

This file explains how the destination data is organized in the application.

## File Structure

```
mobile/
  data/
    destinations.ts  <-- Centralized data source
  app/
    (tabs)/
      index.tsx      <-- Dashboard (uses destinations)
      booking.tsx    <-- Booking (uses destinations)
      schedule.tsx   <-- Schedule (has its own trip data)
```

## Destination Data Schema

Each destination object contains:
- `id`: Unique identifier
- `name`: Destination name (e.g., "Santorini", "Kyoto Temple")
- `location`: Full address/location string
- `country`: Country name
- `price`: Numeric price (for calculations)
- `priceFormatted`: Formatted price string with currency (₱)
- `rating`: String rating (e.g., "4.9")
- `category`: Optional category (Beach, Forest, Islands, Cabins)
- `image`: Required image asset

## Usage

### Dashboard Screen (index.tsx)
Uses `destinations` array to display property cards with:
- Property name
- Location
- Numeric price (₱{price}/Night)
- Image

### Booking Screen (booking.tsx)
Uses `destinations` array to display destination cards with:
- Destination name
- Country
- Formatted price
- Rating
- Image

### Categories
Both screens use the shared `categories` array for the category selector.

## Adding New Destinations

To add a new destination, simply add to the `destinations` array in `data/destinations.ts`:

```typescript
{
  id: 5,
  name: "New Destination",
  location: "Full Address",
  country: "Country Name",
  price: 1000,
  priceFormatted: "₱16,500",
  rating: "4.8",
  category: "Beach",
  image: require("../assets/images/newimage.png"),
}
```

The change will automatically reflect in both Dashboard and Booking screens!
