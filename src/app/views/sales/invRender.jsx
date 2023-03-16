import React from 'react'
import Inv from '../Newinvoice/Newinvoiceview';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
export default function invRender() {
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft:60,
            paddingRight:60,
            lineHeight: 1.5,
            flexDirection: 'column',
        }, 
        logo: {
            width: 74,
            height: 66,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
      });
  return (
    <Document>
                <Page size="A4" style={styles.page}>
                    <Inv />
                </Page>
            </Document>
  )
}
