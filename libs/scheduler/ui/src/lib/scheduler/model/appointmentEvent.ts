/**
 * A model to define appointment events
 */
export interface AppointmentEvent {
  /**
   * The title of the appointment
   */
  title?: string;
  /**
   * The priority of the event
   */
  priority?: 'high'|'medium'|'low';
  /**
   * represents-is the appointment a recurring event ?
   */
  repeating?: boolean;
  /**
   * for whom is the appointment
   */
  contact?: string;
  /**
   * length of the appointment
   */
  length?: number;
  /**
   * start time of the appointment
   */
  startTime?: Date;
  /**
   * offset
   */
  offset?: number;
  /**
   * original index of array
   */
  originalIndex?:number;
}
