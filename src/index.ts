import { select } from 'd3-selection';
import { legend } from '@observablehq/plot';
import type CalHeatmap from 'cal-heatmap';
import VERSION from './version';

import type {
  ILegend,
  LegendOptions,
} from './types';

const DEFAULT_SELECTOR = '#ch-plugin-legend';

const defaultOptions: LegendOptions = {
  // Whether to display the legend
  enabled: true,

  itemSelector: null,

  label: null,

  width: 130,
};

export default class Legend implements ILegend {
  static readonly VERSION = VERSION;

  calendar!: CalHeatmap;

  root: any;

  shown: boolean;

  options: LegendOptions;

  constructor() {
    this.root = null;
    this.shown = false;
    this.options = defaultOptions;
  }

  setup(calendar: CalHeatmap, pluginOptions?: Partial<LegendOptions>): void {
    this.calendar = calendar;
    this.options = { ...defaultOptions, ...pluginOptions };
  }

  paint(): Promise<unknown> {
    if (!this.calendar) {
      throw new Error('Calendar is not initialized.');
    }

    const scaleOptions = this.calendar.options.options.scale;
    const { enabled, itemSelector } = this.options;

    if (!enabled || (itemSelector && select(itemSelector).empty())) {
      return this.destroy();
    }

    this.shown = true;

    this.root = select(
      itemSelector || this.calendar.options.options.itemSelector,
    );

    if (this.root.select(DEFAULT_SELECTOR).empty()) {
      this.root = this.root.append('div').attr('id', DEFAULT_SELECTOR.slice(1));
    } else {
      this.root = this.root.select(DEFAULT_SELECTOR);
    }

    // @ts-ignore
    const node = legend({
      ...scaleOptions,
      ...this.options,
    });

    this.root.selectAll('*').remove();
    this.root.append(() => node);

    return Promise.resolve();
  }

  destroy(): Promise<unknown> {
    if (this.root !== null) {
      this.root.remove();
      this.root = null;
    }

    return Promise.resolve();
  }
}
