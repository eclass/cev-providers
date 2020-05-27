/**
 * **Módulo** de Proveedor CEV.
 */
export interface BaseProvider {
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  login(param: boolean): void

  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  createParticipant(param: boolean): void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  editParticipant(param: boolean): void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  deleteParticipant(param: boolean): void

  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  createMeeting(param: boolean): void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  editMeeting(param: boolean): void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  deleteMeeting(param: boolean): void

  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  goMeeting(param: boolean): void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  goMeetingTeacher(param: boolean): void
}
