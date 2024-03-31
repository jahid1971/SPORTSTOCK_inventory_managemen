
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { FaFilePdf } from "react-icons/fa";

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        width: "40%",
        textAlign: "right",
        paddingRight: 10,
    },
    value: {
        fontSize: 12,
        width: "60%",
        textAlign: "left",
        paddingLeft: 10,
    },
});

// Create Document Component
const PdfSaleReport = (params: any) => {

    const document = (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.header}>Sale Report</Text>
                <View style={styles.section}>
                    <Text style={styles.label}>Sale Id:</Text>
                    <Text style={styles.value}>{params.data?.saleId}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Product Name:</Text>
                    <Text style={styles.value}>{params.data.productName}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Sold By:</Text>
                    <Text style={styles.value}>{params?.data?.saleData?.soldBy?.sellerName}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Buyer Name:</Text>
                    <Text style={styles.value}>{params.data.buyerName}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Quantity:</Text>
                    <Text style={styles.value}>{params.data.quantity}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Total Price:</Text>
                    <Text style={styles.value}>{params.data.totalPrice}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Branch:</Text>
                    <Text style={styles.value}>{params.data.branch}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Sale Date:</Text>
                    <Text style={styles.value}>{new Date(params.data.saleDate).toLocaleDateString()}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <PDFDownloadLink document={document} fileName="sale_report.pdf">
            {({ loading }) =>
                loading ? (
                    "Loading document..."
                ) : (
                    <button>
                        <FaFilePdf className="size-5 text-primary" />
                    </button>
                )
            }
        </PDFDownloadLink>
    );
};

export default PdfSaleReport;
