import React, { createContext, useState, useRef, useContext, useEffect } from 'react'
import { colorBorder, colorGrayscale1, colorSlateDark, greyBorder, translucidBlack, white } from '../colors/colors';
import { Translator } from '../translator/translator'
import { Resizer } from '../resizer/resizer';
import { getRandomId } from '../card/ids/new-random-id';

type MainProps = {
  children?: React.ReactNode,
  openAfterLoad?: boolean,
  onlyInternalLayout?: boolean,
  headOvalBorder?: boolean,
  firstOne?: boolean,
  lastOne?: boolean,
  squaredCorners?: boolean,
  detailsLabel?: boolean,
  dontDisplayDetailsLink?: boolean,
  hasParent?: boolean
};

type DetailsContextType = {
  detailsOpened: [boolean, React.Dispatch<React.SetStateAction<boolean>>] | null,
  addedHeights: [Map<string, number>, React.Dispatch<React.SetStateAction<Map<string, number>>>] | null
  currentWidth: [number, React.Dispatch<React.SetStateAction<number>>] | null,
  resizeFunctions: [Map<string, () => void>, React.Dispatch<React.SetStateAction<Map<string, () => void>>>] | null,
  parentDetailsOpened: [boolean, React.Dispatch<React.SetStateAction<boolean>>][],
  parentResize: () => void
};
const DetailsContext = createContext<DetailsContextType>({
  parentDetailsOpened: [],
  detailsOpened: null, currentWidth: null, addedHeights: null, resizeFunctions: null,
  parentResize: () => { }
});

const Main = (props: MainProps) => {
  const detailsOpened = useState(false)
  const currentWidth = useState(0)
  const addedHeights = useState(new Map())
  const resizeFunctions = useState(new Map())
  return <DetailsContext.Consumer>{parentDetailsContext =>
    <DetailsContext.Provider value={{
      detailsOpened,
      currentWidth,
      addedHeights,
      resizeFunctions,
      parentDetailsOpened: !parentDetailsContext.detailsOpened ?
        parentDetailsContext.parentDetailsOpened : [
          ...parentDetailsContext.parentDetailsOpened,
          parentDetailsContext.detailsOpened
        ],
      parentResize: parentDetailsContext.resizeFunctions ? () => {
        [...(parentDetailsContext.resizeFunctions?.[0]?.values?.() ?? [])]
          .forEach(resizeFunction => resizeFunction?.())
      } : () => { }
    }}><BoxInner {...props} /></DetailsContext.Provider>
  }</DetailsContext.Consumer>
}

const BoxInner = (
  {
    children,
    openAfterLoad,
    onlyInternalLayout,
    headOvalBorder,
    firstOne,
    lastOne,
    squaredCorners,
    detailsLabel,
    dontDisplayDetailsLink,
    hasParent
  }: MainProps) => {
  const detailsContext = useContext(DetailsContext);
  const [detailsOpened, setDetailsOpened] = detailsContext.detailsOpened ?? [false, () => { }];
  if (openAfterLoad) {
    setTimeout(() => setDetailsOpened(true), onlyInternalLayout ? 1000 : 1)
  }
  return (<Border
    detailsOpened={detailsOpened}
    squaredCorners={squaredCorners}
    onlyInternalLayout={onlyInternalLayout}
    headOvalBorder={headOvalBorder}
    firstOne={firstOne}
    lastOne={lastOne}
    hasParentBox={hasParent}>
    <Row borderBottom={lastOne === false && squaredCorners}>
      <Column additionalStyle={{ flexGrow: '1' }}>
        {Array.from((children ?? []) as React.ReactNode[])
          .filter(c => c && (c as JSX.Element).type === Head)}
      </Column>
      <Resizer.Consumer>{resize =>
        <Column additionalStyle={{ paddingTop: onlyInternalLayout ? resize(2) : resize(3.5) }}>
          {!dontDisplayDetailsLink &&
            <MoreDetailsLink onClick={() => setDetailsOpened(!detailsOpened)} detailsLabel={detailsLabel}
              activated={!!Array.from((children ?? []) as React.ReactNode[])
                .filter(c => c)
                .find(c => (c as JSX.Element).type === Details)} />}
        </Column>
      }</Resizer.Consumer>
    </Row>
    {React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === Head) return null;
      return child;
    })}
  </Border>)
}

const Oval: ({ left, hasParentBox }: { left?: boolean, hasParentBox?: boolean }) => JSX.Element = ({ left, hasParentBox }) =>
  <Resizer.Consumer>{resize => <div style={
    {
      width: resize(3), overflow: 'hidden',
      marginLeft: left ? undefined : resize(-0.6),
      marginRight: left ? resize(-0.4) : undefined,
      position: hasParentBox ? 'absolute' : 'relative',
      right: left ? '0' : undefined
    }}><div style={{
      borderRadius: '100%',
      border: `solid ${resize(0.4)} ${colorBorder}`,
      backgroundColor: colorGrayscale1,
      position: 'relative',
      width: resize(8), fontSize: resize(4, 'height'),
      marginLeft: left ? '0' : resize(-5)
    }}>&nbsp;</div></div>}</Resizer.Consumer>


const Border = ({ children, onlyInternalLayout, headOvalBorder, firstOne,
  lastOne, squaredCorners, detailsOpened, hasParentBox }: {
    children?: React.ReactNode, onlyInternalLayout?: boolean, headOvalBorder?: boolean,
    firstOne?: boolean, lastOne?: boolean,
    squaredCorners?: boolean, detailsOpened?: boolean, hasParentBox?: boolean
  }) => (
  <Resizer.Consumer>{resize => headOvalBorder ? <div style={{
    backgroundColor: white,
    color: colorSlateDark,
    width: '100%',
    minWidth: resize(56),
    maxWidth: resize(100),
    fontSize: resize(4, 'height'),
    minHeight: resize(5, 'height'),
    marginTop: resize(-0.4),
    marginLeft: firstOne === false ? resize(0.2) : undefined,
    borderLeft: `solid ${resize(0.4)} ${colorBorder}`,
    borderBottom: !hasParentBox ? `solid ${resize(0.4)} ${colorBorder}` : undefined
  }}><div style={{ display: 'flex', flexDirection: 'row' }}><Oval />
      <div style={{
        flexGrow: 1,
        background:
          'linear-gradient(to right,transparent,transparent 50%,' + translucidBlack + ' 50%,' + translucidBlack + ')',
        backgroundSize: `${resize(1)} ${resize(0.4)}`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0% 50%'
      }}>&nbsp;</div>
      <Oval left={true} hasParentBox={hasParentBox} /></div>{children}</div>
    : <div style={
      onlyInternalLayout ? {} : {
        backgroundColor: white,
        border: `1px solid ${greyBorder}`,
        fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
        borderRadius: squaredCorners ? '0' : resize(0.8),
        borderColor: colorBorder,
        borderWidth: resize(0.4),
        color: colorSlateDark,
        fontSize: resize(4, 'height'),
        width: '100%',
        minWidth: resize(56),
        maxWidth: resize(100),
        overflow: detailsOpened ? undefined : 'hidden',
        minHeight: lastOne === false && squaredCorners ? resize(4) : resize(6),
        borderBottomLeftRadius: lastOne === false ? '0' : resize(0.8),
        borderBottomRightRadius: lastOne === false ? '0' : resize(0.8),
        borderTopLeftRadius: firstOne === true || squaredCorners ? '0' : resize(0.8),
        borderTopRightRadius: firstOne === true || squaredCorners ? '0' : resize(0.8),
        borderTop: firstOne === true ? '0' : `solid ${resize(0.4)} ${colorBorder}`,
        borderBottom: (lastOne === false && !squaredCorners) || hasParentBox ? 'none' :
          `solid ${resize(0.4)} ${colorBorder}`,
      }}>{children}</div>}</Resizer.Consumer>)


const Head = ({ children, additionalStyle }: { children?: React.ReactNode, additionalStyle?: any }) => (
  <Resizer.Consumer>{resize =>
    <div style={Object.assign({}, { paddingTop: resize(2), display: 'flex', flexDirection: 'row' }, additionalStyle)}>{children}</div>}</Resizer.Consumer>)


const Row = ({ children, additionalStyle, notPadded, borderBottom }:
  { children?: React.ReactNode, additionalStyle?: any, notPadded?: boolean, borderBottom?: boolean }) => (
  <Resizer.Consumer>{resize => <div style={notPadded ? {} : {
    paddingLeft: resize(2), paddingRight: resize(2),
    paddingBottom: borderBottom === true ? resize(2) : undefined,
    borderBottom: borderBottom === true ? `solid ${resize(0.4)} ${colorBorder}` : undefined
  }}>
    <div style={Object.assign({}, additionalStyle, { display: 'flex', flexDirection: 'row' })}>{children}</div></div>}</Resizer.Consumer>)

type ColumnProps = { width?: string, additionalStyle?: any, children?: React.ReactNode }
type ColumnComponent = (props: ColumnProps) => JSX.Element
const Column: ColumnComponent = ({ width, additionalStyle, children }) => (
  <Resizer.Consumer>{resize => <div style={Object.assign({}, { flex: 'flex-grow' },
    { minWidth: resize(4), marginLeft: width, marginRight: width }, additionalStyle)}>{children}</div>}</Resizer.Consumer>)

const Details = ({ noBorder, children }: { noBorder?: boolean, children: React.ReactNode }) => {
  const [detailsIndex] = useState(getRandomId());
  const detailsContext = useContext(DetailsContext);
  const [detailsOpened] = detailsContext.detailsOpened ?? [false];
  const parentDetailsOpened = detailsContext.parentDetailsOpened.every(([parent]) => parent);
  const parentResize = detailsContext.parentResize;
  const [addedHeights, setAddedHeights] = detailsContext.addedHeights ?? [new Map(), () => { }];
  const [resizeFunctions, setResizeFunctions] = detailsContext.resizeFunctions ?? [new Map(), () => { }];
  const [_, setCurrentWidth] = detailsContext.currentWidth ?? [new Map(), () => { }];
  const divRef: React.RefObject<HTMLDivElement> = useRef(null);
  const resizeListener = () => {
    if (!divRef.current) return;
    divRef.current.style.removeProperty("height");
    const newHeight =
      parseInt(window.getComputedStyle(divRef.current).height ?? "0");
    const newWidth =
      parseInt(window.getComputedStyle(divRef.current).width ?? "0");
    setCurrentWidth(newWidth);
    addedHeights?.set(detailsIndex, newHeight);
    setAddedHeights(addedHeights ?? new Map());
    parentResize()
  }
  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return function cleanup() {
      window.removeEventListener('resize', resizeListener);
    }
  }, []);
  useEffect(() => {
    if (!resizeFunctions.get(detailsIndex))
      resizeFunctions.set(detailsIndex, resizeListener);
    setResizeFunctions(resizeFunctions);
    resizeListener();
  }, [divRef, detailsOpened]);
  return (<Resizer.Consumer>{resize => <div id={detailsIndex} ref={divRef}
    style={{
      height: isNaN(addedHeights.get(detailsIndex)) ? undefined :
        addedHeights.get(detailsIndex),
      position: !detailsOpened ? 'absolute' : 'static',
      visibility: !detailsOpened || !parentDetailsOpened ? 'hidden' : 'visible',
      transition: "height 0.5s",
      display: 'flex',
      flexDirection: 'column',
      transitionTimingFunction: 'ease-out',
      marginLeft: noBorder === true ? resize(-0.4) : 0,
      marginRight: noBorder === true ? resize(-0.4) : 0,
      width: '100%'
    }}>{children}</div>}</Resizer.Consumer>)
}

type MoreDetailsLinkProps = { activated: boolean, detailsLabel?: boolean, onClick: () => void }
const MoreDetailsLink = ({ activated, detailsLabel, onClick }: MoreDetailsLinkProps) => {
  const detailsContext = useContext(DetailsContext);
  const [detailsOpened] = detailsContext.detailsOpened ?? [false];
  return (!activated ? null :
    <Resizer.Consumer>{resize => <Translator.Consumer>{translate => <a
      className="toggle"
      style={{ paddingLeft: resize(2.5), fontSize: resize(3, 'height'), wordSpacing: resize(1) }}
      onClick={onClick}
    >{detailsLabel !== false && translate('Details') + ' '}<span
      className="material-icons"
      style={{
        transform: `rotate(${detailsOpened ? 179.9 : 0}deg)`,
        transition: 'transform 0.5s',
      }}
    >arrow_drop_down</span>
    </a>}</Translator.Consumer>}</Resizer.Consumer>)
}

export const Box = { BoxInner, Main, Head, Row, Column, Details, DetailsContext, MoreDetailsLink }
