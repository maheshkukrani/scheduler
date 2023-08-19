import {AppointmentEvent} from "./appointmentEvent";

/**
 * A model to define group appointment events
 */
export interface GroupEvent {
  /**
   * The events
   */
  events?: AppointmentEvent[];
  /**
   * The offset from top
   */
  offset?: number;
  /**
   * The startTime
   */
  startTime?: Date;
  /**
   * The endTime
   */
  endTime?: Date;

}
