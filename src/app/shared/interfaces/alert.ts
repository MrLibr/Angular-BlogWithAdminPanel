export type AlertType = 'success' | 'warning' | 'danger';

export default interface Alert {
  type: AlertType;
  text: string;
}
