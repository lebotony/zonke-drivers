import { isEmpty } from "lodash";

type MissingField = "model" | "image" | "price";

type ValidationResult = {
  isValid: boolean;
  missingFields: MissingField[];
};

/**
 * Validates if a vehicle has all required fields for activation
 * Required fields: model, vehicle image (asset), rent per week (price_fixed)
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

  // Check rent per week (price_fixed)
  if (!vehicle?.price_fixed?.value || vehicle.price_fixed.value <= 0) {
    missingFields.push("price");
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};
