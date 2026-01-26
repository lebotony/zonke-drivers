import { isEmpty } from "lodash";

type MissingField = "model" | "image" | "price";

type ValidationResult = {
  isValid: boolean;
  missingFields: MissingField[];
};

/**
 * Validates if a vehicle has all required fields for activation
 * Required fields: model, vehicle image (asset), price (price_fixed for rent or sale_price for sale)
 */
export const validateVehicleActivation = (
  vehicle: Partial<Vehicle>
): ValidationResult => {
  const missingFields: MissingField[] = [];

  // Check model
  if (!vehicle?.model || vehicle.model.trim() === "") {
    missingFields.push("model");
  }

  // Check vehicle image
  if (isEmpty(vehicle?.asset?.url) && isEmpty(vehicle?.asset?.filename)) {
    missingFields.push("image");
  }

  // Check price based on vehicle type
  if (vehicle?.on_sale) {
    // For sale vehicles, check sale_price
    if (!vehicle?.sale_price?.value || vehicle.sale_price.value <= 0) {
      missingFields.push("price");
    }
  } else {
    // For rental vehicles, check price_fixed
    if (!vehicle?.price_fixed?.value || vehicle.price_fixed.value <= 0) {
      missingFields.push("price");
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};
