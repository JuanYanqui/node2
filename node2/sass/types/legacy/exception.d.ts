/**
 * The exception type thrown by {@link renderSync} and passed as the error to
 * {@link render}'s callback.
 *
 * @category Legacy
 * @deprecated This is only thrown by the legacy {@link render} and {@link
 * renderSync} APIs. Use {@link compile}, {@link compileString}, {@link
 * compileAsync}, and {@link compileStringAsync} instead.
 */
export interface LegacyException extends Error {
  /**
   * The error message. For Dart Sass, when possible this includes a highlighted
   * indication of where in the source file the error occurred as well as the
   * Sass stack trace.
   */
  message: string;

  /**
   * The error message. For Dart Sass, this is the same as the result of calling
   * {@link toString}, which is itself the same as {@link message} but with the
   * prefix "Error:".
   */
  formatted: string;

  /**
   * The (1-based) line number on which the error occurred, if this exception is
   * associated with a specific Sass file location.
   */
  line?: number;

  /**
   * The (1-based) column number within {@link line} at which the error
   * occurred, if this exception is associated with a specific Sass file
   * location.
   */
  column?: number;

  /**
   * Analogous to the exit code for an executable. `1` for an error caused by a
   * Sass file, `3` for any other type of error.
   */
  status: number;

  /**
   * If this exception was caused by an error in a Sass file, this will
   * represent the Sass file's location. It can be in one of three formats:
   *
   * * If the Sass file was loaded from disk, this is the path to that file.
   * * If the Sass file was generated by an importer, this is its canonical URL.
   * * If the Sass file was passed as {@link LegacyStringOptions.data} without a
   *   corresponding {@link LegacyStringOptions.file}, this is the special
   *   string `"stdin"`.
   */
  file?: string;
}
