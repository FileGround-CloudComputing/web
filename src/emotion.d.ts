import "@emotion/babel-plugin";
import { Theme as LocalTheme } from "@/presentation/atomics/theme/types";
declare module "@emotion/react" {
  export interface Theme extends LocalTheme {
    _: string;
  }
}
