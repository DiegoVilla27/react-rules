import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

/** 
 * Docs https://commitlint.js.org/#/reference-rules
  Each rule has 3 properties:
  -> Level
  0: Disables the rule
  1: Enables the rule like a warning
  2: Enables the rule like a error
  -> Applicable
  "always": Enables the rule always
  "never": Disable the rule always
  -> Value
  string|boolean|number|array

  "name-rule": [Level, Applicable, Value]
*/

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [
      // Se encarga de validar el tipo
      RuleConfigSeverity.Error,
      "never"
    ],
    "type-enum": [
      // Se encarga de los tipos (Example: feat, fix, bug and others)
      RuleConfigSeverity.Error,
      "always",
      ["feat", "fix", "styles", "docs", "test", "refactor"]
    ],
    "type-case": [
      // Se encarga del case en el type
      RuleConfigSeverity.Error,
      "always",
      "lower-case"
    ],
    "scope-empty": [
      // Se encarga del scope (Example: feat(frontend), fix(web) and others)
      RuleConfigSeverity.Error,
      "always"
    ],
    "subject-empty": [
      // Se encarga de validar el subject
      RuleConfigSeverity.Error,
      "never"
    ],
    "subject-case": [
      // Se encarga del case en el subject
      RuleConfigSeverity.Error,
      "always",
      "sentence-case"
    ],
    "subject-min-length": [
      // Se encarga del tamaño minimo del subject
      RuleConfigSeverity.Error,
      "always",
      10
    ],
    "subject-max-length": [
      // Se encarga del tamaño máximo del subject
      RuleConfigSeverity.Error,
      "always",
      50
    ],
    "body-empty": [
      // Se encarga de validar el body
      RuleConfigSeverity.Error,
      "always"
    ],
    "footer-empty": [
      // Se encarga de validar el footer
      RuleConfigSeverity.Error,
      "always"
    ]
  }
};
module.exports = Configuration;
