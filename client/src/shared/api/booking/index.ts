import { api } from "../api";
import { AvailableDatesResponse, BookingRequest, BookingResponse, Service, Specialist } from "./model";

export const createBooking = async (
  booking: BookingRequest
): Promise<BookingResponse> => {
  try {
    const response = await api.post("booking", {
      json: booking,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error in createBooking:", error);
    throw new Error("Failed to create booking");
  }
};

export const getAvailableServices = async (
  businessId: string
) => {

  try {
    const response = await api.get(`booking/booking-from-service/services/${businessId}`).json<Service[]>();
    return response

  } catch (error) {
    console.error("Error in getAvailableServices:", error);
    throw new Error("Failed to fetch services");
  }
};


export const getSpecialistsByService = async (
  serviceId: string,
  businessId: string
) => {
  try {
    const response = await api.get(
      `booking/booking-from-service/specialists/${serviceId}/${businessId}`
    ).json<Specialist[]>()
    console.log('&&\n',  response);
    
    return response
  } catch (error) {
    console.error("Error in getSpecialistsByService:", error);
    throw new Error("Failed to fetch specialists");
  }
};

export const getAvailableDatesForServiceAndStaff = async (
  serviceId: string,
  staffId: string
) => {
  console.log("&&\n", serviceId);
  
  try {
    const response = await api.get(
      `booking/booking-from-service/available-dates?serviceId=${serviceId}&staffId=${staffId}`
    ).json<AvailableDatesResponse[]>()
    console.log(response);
    
    return response;
  } catch (error) {
    console.error("Ошибка при получении доступных дат:", error);
    throw new Error("Failed to fetch available dates");
  }
};
  