// Utility functions for tokenization
export const generateMachineToken = (machineId: string, timestamp: number): string => {
  console.log('Generating machine token for:', machineId);
  // Simple token generation - in production, use a more secure method
  return `MCH_${machineId}_${timestamp}_${Math.random().toString(36).substring(7)}`;
};

export const generateProductToken = (productId: string, timestamp: number): string => {
  console.log('Generating product token for:', productId);
  // Simple token generation - in production, use a more secure method
  return `PRD_${productId}_${timestamp}_${Math.random().toString(36).substring(7)}`;
};

export const validateToken = (token: string): boolean => {
  console.log('Validating token:', token);
  // Basic validation - in production, implement more robust validation
  return token.startsWith('MCH_') || token.startsWith('PRD_');
};