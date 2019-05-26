export type TableProp<T> = {
  data: T[],
  headerRowHeight: number,
  rowHeight: number,
  columnCount: number,
  maxHeight: number,
  throttleWait: number,
  preRenderRowCount: number,
  globalStickyHeader: boolean,
  localStickyHeader: boolean,
  enableStickyHeaderShadow: boolean,
  enableFreezeColumnShadow: boolean,
  freezeColumnShadowLeftOffset: number,
  renderHeader(): React.ReactElement<any>,
  renderRow(row: T, rowIndex: number, data: T[]): React.ReactElement<any>,
  propTypes: any,
  TBody: any,
}

export type TableState = {
  scrollerClientWidth: number,
  scrollerHeight: number,
  scrollerScrollLeft: number,
  renderFromIndex: number,
  renderToIndex: number,
  isGlobalHeaderSticky: boolean,
  isLocalHeaderSticky: boolean,
}

export type ScrollerProp = {
  maxHeight: number,
}

export type TrProp = {
  width: number,
  globalSticky: boolean,
  localSticky: boolean,
  bottomShadow: boolean,
}

export type StyledThProp = {
  cellWidth: number,
  height: number,
  freezeLeftOffset: number | null,
}

export type ThProp = {
}

export type StyledTdProp = {
  cellWidth: number,
  height: number,
  freezeLeftOffset: number | null,
}

export type TdProp = {
}

