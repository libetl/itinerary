import React from 'react'
import { Box } from './box/box'
import { Card } from './card/card'
import { Icon } from './icon/icon'
import { Unread } from './unread/unread'
import { Translator, translatorBuilder } from './translator/translator'
import { Resizer, inFontSize, inViewportHeight } from './resizer/resizer'

export const Itinerary: (props: Itinerary.Props) => JSX.Element =
  ({ items, stayClosed, actionType = 'BOOK', googleMapsApiKey, translate, resizeInFontSize, supplierLogoFunction }) => {
    return <Resizer.Provider value={resizeInFontSize ? inFontSize : inViewportHeight}>
      <Resizer.Consumer>{resize =>
        <Translator.Provider value={translatorBuilder(translate)}>
          <Translator.Consumer>{builtTranslate =>
            ((items ?? []).length > 1 || (items ?? []).length === 0 || (actionType !== 'BOOK')) ? <Box.Main
              openAfterLoad={stayClosed !== true} lastOne={false} squaredCorners={true} detailsLabel={false}>
              <Box.Head additionalStyle={{ paddingTop: resize(3) }}>
                {(!actionType || actionType === 'BOOK') && <Box.Column width={resize(3)} additionalStyle={{ marginRight: resize(3) }}>
                  <Unread count={(items ?? []).length} />
                  <Icon name={(items ?? []).length === 0 ? 'warn' : 'shopping_cart'} />
                </Box.Column>}
                <Box.Column>
                  {actionType === 'CANCEL' ? <span>{builtTranslate("Product(s) to be canceled")}</span> :
                    actionType === 'CHANGE' ? <span>{builtTranslate("Product(s) to be changed")}</span> : <b>{
                      builtTranslate("Itinerary")}{(items ?? []).length === 0 ? ': ' + builtTranslate("empty") : ''}</b>}
                </Box.Column>
              </Box.Head>
              {(items ?? []).length > 0 &&
                <Box.Details noBorder={true}>
                  {(items ?? []).map((card, i) =>
                    <Card translate={translate} resizeInFontSize={resizeInFontSize}
                      key={`card-${i}`} {...card} googleMapsApiKey={googleMapsApiKey} firstOne={i === 0}
                      lastOne={i === (items ?? []).length - 1} headOvalBorder={i !== 0}
                      supplierLogoFunction={supplierLogoFunction}
                    />)}
                </Box.Details>}
            </Box.Main> : (items ?? []).length === 1 ?
              <Card resizeInFontSize={resizeInFontSize}
                googleMapsApiKey={googleMapsApiKey}
                supplierLogoFunction={supplierLogoFunction}
                {...(items ?? [])[0]} /> : <span />
          }</Translator.Consumer>
        </Translator.Provider>}
      </Resizer.Consumer>
    </Resizer.Provider>
  }