import type { IPlugin, PluginOptions } from '../index';

export interface LegendOptions extends PluginOptions {
  enabled: boolean;
  itemSelector: string | null;
  label: string | null;
  width: number;
}

export interface ILegend extends IPlugin {
}

export default class Legend {
  static readonly VERSION: string;

  calendar: CalHeatmap;

  options: PluginOptions;

  root: any;

  setup: (calendar: CalHeatmap, options?: PluginOptions) => void;

  paint: () => Promise<unknown>;

  destroy: () => Promise<unknown>;
}
