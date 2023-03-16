import React from "react";
import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View
} from "@react-pdf/renderer";

const COMPANY_LEGAL_NAME = "Test Company .llc";
const TERMS_CONDITIONS_REV_NUMBER = "1.2.3";
const asDollars = price => {
    return "$" + price;
};

const fonts = {
    courier: "Courier",
    courierBold: "Courier-Bold",
    courierOblique: "Courier-Oblique",
    helvetica: "Helvetica",
    helveticaBold: "Helvetica-Bold",
    helveticaOblique: "Helvetica-Oblique",
    times: "Times-Roman",
    timesBold: "Times-Bold",
    timesItalic: "Times-Italic"
};
const styles = StyleSheet.create({
    page: {
        padding: 24,
        paddingBottom: 108
        // positionRelative: 1,
    },
    header: {
        fontSize: 12,
        flexDirection: "row",
        marginBottom: 10,
        color: "grey",
        justifyContent: "space-between"
    },
    mainLogo: {
        flex: 1,
        margin: 10,
        marginBottom: 0,
        width: "20%",
        height: "auto",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 15
    },
    companyInfo: {
        fontSize: 12,
        margin: 10,
        flexGrow: 1
    },
    customerInfo: {
        fontSize: 12,
        width: "100%"
    },
    poc: {
        marginBottom: 10,
        paddingBottom: 10
    },
    person: {},
    tableHead: {
        // flex: 1,
        margin: 4,
        flexDirection: "row",
        margin: 4,
        marginTop: 24,
        flexDirection: "row",
        fontSize: 10,
        fontFamily: fonts.helveticaBold
    },
    underlined: {
        textDecoration: "underline"
    },
    column: {
        fontSize: 11
    },
    column1: {
        order: 1,
        flexBasis: "15%",
        // width: "60%",
        fontSize: 11
    },
    column2: {
        order: 2,
        flexBasis: "15%",
        // width: "15%",
        fontSize: 11
    },
    column3: {
        order: 3,
        flexBasis: "15%",
        // width: "5%",
        fontSize: 11
    },
    column4: {
        order: 4,
        flexBasis: "15%",
        // width: "5%",
        fontSize: 11
    },
    column5: {
        order: 5,
        flexBasis: "15%",
        // width: "15%",
        fontSize: 11
    },
    parentLineWrapper: {
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftStyle: "solid",
        borderLeftColor: "lightgray",
        borderTopWidth: 2,
        borderTopStyle: "solid",
        borderTopColor: "black",
        borderBottomWidth: 6,
        borderBottomStyle: "solid",
        borderBottomColor: "lightgray",
        marginBottom: 24
    },
    childLineWrapper: {
        // marginTop: 8,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftStyle: "solid",
        borderLeftColor: "lightgray",
        borderTopWidth: 2,
        borderTopStyle: "solid",
        borderTopColor: "black"
    },
    lineItem: {},
    itemTopRow: {
        marginTop: 5,
        flexDirection: "row"
    },
    optionWrapper: {
        marginVertical: 5,
        fontSize: 11
    },
    optionList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "60%"
    },
    option: {
        fontSize: 9,
        paddingVertical: 4,
        width: "25%",
        maxHeight: 27,
        paddingHorizontal: 4
    },
    grandTotalLine: {
        width: "100%",
        flexDirection: "row"
    },
    grandTotal: {
        width: "40%",
        textAlign: "right"
    },
    specialRequirements: {
        width: "60%",
        marginBottom: 50
    },
    terms: {
        paddingTop: 16,
        fontSize: 10,
        color: "darkgrey",
        position: "absolute",
        // positionAbsolute: 1,
        bottom: 108,
        left: 24
    },
    footerImage: {
        width: "100%",
        height: "auto"
    },
    footer: {
        position: "absolute",
        fontSize: 12,
        bottom: 15,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        color: "grey"
    },
    text: {
        fontSize: 14,
        textAlign: "justify",
        fontFamily: fonts.helvetica
    }
});

// @NOTE!!
// if a component has wrap={false}, and the component gets so large that it cannot fit on it's own page, then react-pdf will crash and freeze your entire web page!
// also note, that with wrap = true, you cannot currently use flex and flexBasis css properties, as they break when wrapping pages.

export const SalesQuote = () => {
    const date = new Date().toLocaleDateString();
    const accountName = "Test Account";
    const person = "Tester McTest";
    const email = "test@test.com";
    const price = asDollars(554546188);
    const productIds = [1, 2];

    const renderItemOptions = () => {
        const options = [
            "option",
            "option",
            "option",
            "option",
            "option",
            "option",
            "option",
            "option",
            "option",
            "option"
        ];
        return options.map(option => (
            <Text style={styles.option}>{"•" + option}</Text>
        ));
    };

    const renderOptionList = () => {
        return (
            <View style={styles.optionWrapper}>
                <Text style={{ ...styles.underlined, ...styles.column }}>Options:</Text>
                <View style={styles.optionList}>{renderItemOptions()}</View>
            </View>
        );
    };

    const parentLineItem = () => {
        const childProductsSelected = [10, 11, 12];
        const price = 554505;
        const finalPrice = 554505;
        const discount = 0;
        const qty = 1;

        const discountRow = discount ? (
            <Text style={styles.column4}>{discount + "%"}</Text>
        ) : (
            <Text style={styles.column4} />
        );
        const discountHeader = discount ? (
            <Text style={styles.column4}>Disc</Text>
        ) : (
            <Text style={styles.column4} />
        );
        const itemHeader = (
            <View style={styles.tableHead}>
                <Text style={styles.column1}>Product</Text>
                <Text style={styles.column2}>Price</Text>
                <Text style={styles.column3}>QTY</Text>
                {discountHeader}
                <Text style={styles.column5}>Line Total</Text>
            </View>
        );

        return (
            <View wrap={true}>
                {itemHeader}
                <View style={styles.parentLineWrapper}>
                    <View style={styles.lineItem}>
                        <View style={styles.itemTopRow}>
                            <View style={styles.column1}>
                                <Text style={{ width: "75%" }}>Test Name</Text>
                                <Text
                                    style={{
                                        fontSize: 8,
                                        fontFamily: fonts.helveticaOblique
                                    }}
                                >
                                    Model#67-56-6-D-54676-7567-56
                                </Text>
                            </View>
                            <Text style={styles.column2}>{asDollars(price)}</Text>
                            <Text style={styles.column3}>{qty}</Text>
                            {discountRow}
                            <Text style={styles.column5}>{asDollars(finalPrice)}</Text>
                        </View>
                        {renderOptionList()}
                    </View>
                    {childProductsSelected.map(childId => childLineItem(childId))}
                    {/*{loremIpsum}*/}
                </View>
            </View>
        );
    };

    const childLineItem = childId => {
        const childProductsSelected = [];
        const qty = 1;

        return (
            <View style={styles.childLineWrapper} wrap={true}>
                <View style={styles.lineItem}>
                    <View style={styles.itemTopRow}>
                        <View style={styles.column1}>
                            <Text style={{ width: "75%" }}>Child Product</Text>
                            <Text style={{ fontSize: 8, fontFamily: fonts.helveticaOblique }}>
                                m#rgwe0--erg34g34g-tbfb-g
                            </Text>
                        </View>
                        <Text style={styles.column2} />
                        <Text style={styles.column3}>{qty}</Text>
                        <Text style={styles.column4} />
                        <Text style={styles.column5} />
                    </View>
                    {renderOptionList(childId)}
                </View>
                {childProductsSelected.map(childId => childLineItem(childId))}
            </View>
        );
    };

    const header = (
        <View style={styles.header} fixed>
            <Text>Logo goes here</Text>
            <View>
                <Text fixed>Quote #: 12546118</Text>
                <Text fixed>Date: {date}</Text>
            </View>
        </View>
    );

    const titleSection = (
        <View style={styles.title}>
            <Text>Sales Quote</Text>
            <Text style={{ fontSize: 10 }}>for</Text>
            <Text>Test Account</Text>
        </View>
    );

    const customerInfo = (
        <View style={styles.customerInfo}>
            <View style={styles.poc}>
                <Text>Sales Person:</Text>
                <Text>Tester McTest</Text>
            </View>
            <View style={styles.person}>
                <Text>{person}</Text>
                <Text>{email}</Text>
                <Text>123 billing address</Text>
            </View>
        </View>
    );

    const specialReqs = (
        <View style={styles.specialRequirements}>
            <Text style={{ ...styles.text, ...styles.underlined, marginTop: 12 }}>
                Special Requirements:
            </Text>
            <Text style={{ ...styles.text, fontSize: 10 }}>none</Text>
        </View>
    );

    const terms = (
        <View style={styles.terms} wrap={false}>
            <Text>All quote in US Dollars</Text>
            <Text>
                <Text style={{ fontFamily: fonts.helveticaBold }}>Please Note:</Text>
                This quote is valid for 30 days
            </Text>
            <Text>Full Terms and Conditions are available on our website</Text>
            <Text>
                {COMPANY_LEGAL_NAME} Terms and Conditions {TERMS_CONDITIONS_REV_NUMBER}{" "}
                Apply{" "}
            </Text>
            <Text>
                * Estimate lead for this product is a minimum of 90 days, US Delivery
            </Text>
            <Text>
                ** Shipping and all other charges are the responsibility of the customer
            </Text>
            <Text>*** Sales Tax as applicable</Text>
        </View>
    );

    // const getFooter = (pageNumber, totalPages) => {
    //     return pageNumber === totalPages ? terms : <Text/>;
    // };

    return (
        <Document
            file="REACtPDF.pdf"
            author="Power Innovations Sales Person"
            title="Sales Quote"
        >
            <Page size="LETTER" style={styles.page} wrap>
                {header}
                {titleSection}
                {customerInfo}
                {productIds.map(option => parentLineItem())}
                <View style={styles.grandTotalLine}>
                    {specialReqs}
                    <View style={styles.grandTotal}>
                        <Text>Grand Total:</Text>
                        <Text>{price}</Text>
                    </View>
                </View>
                {terms}
                <View style={styles.footer} fixed>
                    <Text>Footer Image goes here</Text>
                </View>
            </Page>
        </Document>
    );
};

export default SalesQuote;
