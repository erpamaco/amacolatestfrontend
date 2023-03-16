import React, { useState, useEffect, useRef } from "react";
import Editor from "./Editor";
import { useReactToPrint } from 'react-to-print';


export default function App() {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState('');
    const componentRef = useRef();


    const handlePrintingCur = useReactToPrint({
        content: () => componentRef.current,
        header: () => componentRef.current
    });



    useEffect(() => {

        setEditorLoaded(true);
        setData(`
        <p>&nbsp;</p><p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ANNEXURE (1)</strong></p><p><strong>DELIVERY TIME</strong> &nbsp; &nbsp; &nbsp; &nbsp; : Within 2-3 Days from the Date of PO&nbsp;</p><p><strong>FREIGHT TYPE</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: Air Freight&nbsp;</p><p><strong>INCO TERMS</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : DDP-Delivery Duty Paid To Customer Office&nbsp;</p><p><strong>PAYMENT TERMS</strong> &nbsp; &nbsp; : 100% Advance</p><p>&nbsp;</p><ul><li>Purchase order acknowledgment – Acknowledgement of PO with 1 day of issuance is mandatory on supplier. The acknowledgement must be done by signing and stamping a copy of our PO.</li><li>Specification – It is requested to provide exact specification of material as mentioned in the purchase order, any deviation other than mentioned in PO, must be approved with amendment in purchase order.</li></ul><p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;The material should be as per your quotation / Pro forma / Invoice.</strong></p><ul><li>Packing – All materials must be packed in sea-worthy or air-worthy with protection against corrosion, weather and damage.</li><li><strong>Country of origin labels </strong>– Country of origin labels ‘’non-removable’’ type must be sticked to all materials in shipment. Failing which customs department in Saudi Arabia will levy penalty of SAR 7,000/- per shipment and shipment will be shipped back. All the charges towards penalty, shipment, and other expenses to be borne by supplier.</li><li>The container must have label indicating the contains of goods in the container and its origin Supplier shall furnish AMACO with all the required and customary certifications, test data, manuals, certificates and technical information and documentation relating to work; including (but not limited) to certificates of origin, weight certificates material test certificate, NDT, pressure test, etc as specified in the PO.</li><li>Bank details – The payment will be dealt either through transfer or letter of credit. In case of transfer, AMACO will bear transfer charges for the first transfer. If the transfer is not through due to reasons beyond AMACO’s responsibility, supplier will have to bear all the charges.</li><li><strong>Delivery period &amp; penalty – Should supplier fail to deliver or perform the work according to the agreed date (s) and/or schedule set out in the PO, AMACO may in its sole discretion, with or without prior notice to the supplier:</strong><ul><li><strong>Extend the time by means of change order.</strong></li><li><strong>Cancel the PO or part of the work and procure goods or services of similar description from other works.</strong></li><li><strong>Claim from supplier the damages suffered (including the amount by which the cost of replacements exceeds the Price) and to the extend allowed under in lieuof the agreed liquidated damages provided for above.</strong></li></ul></li><li>Order progress – Order progress reports must be sent on weekly basis, without any reminders.</li><li>Shipping documents – A copy of shipping documents must be sent before attestation for review and confirmation. In case the shipment is sent without review of shipping documents, any demurrage or penalties resulting due to discrepancy in shipping documents, must be borne by supplier.</li><li><strong>Country of Origin</strong> – Materials of origin like China and East Europe are not acceptable unless clearly mentioned in purchase order. In the event of supplier sending the material with origin other than agreed in the Purchase order, AMACO reserves the right to reject the material and claim for return of payments made.</li><li>AMACO shall be entitled to inspect and/or test (or arrange for independent inspection/testing) the work at supplier’s facilities prior to and/or at delivery/completion in order to ensure that they conform to the Specifications. In the event that the inspection shows that work do not conform to the specifications or requirements of the PO, AMACO shall be entitled to reject the delivery and cancel the purchase agreement forthwith.</li><li>Quality &amp; Warranty - The work shall conform in all respects to the quality requirements and specifications set out in the PO; and if not specified, to the normal and customary specifications or quality of such goods, or in the case of services; in accordance with accepted industry practices and any applicable professional standards and codes.<ul><li>Supplier may not change the Specifications, material or manufacturing processes without the prior written consent of AMACO.</li><li>Supplier warrants and guarantees that the Work will be free from faulty design, defects (whether patent or latent), in material and workmanship (fair wear and tear excluded) and fit for the intended purpose for a period of at least eighteen (18) months after acceptance or twelve (12) months from use, installation commissioning (whichever is the latest).</li><li>If any such defects or failure is discovered or occur within the warranty period, AMACO shall notify supplier accordingly, and supplier shall promptly, and at his sole cost and risk repair or replace or replace or otherwise makegood any and all work which are found to be defective. In addition, supplier shall compensate AMACO for all costs and expenses reasonably incurred or suffered in connection with the defect and the repairs or replacement of the works (or part thereof) under the warranty.</li><li>The repairs/replacement works will carry the same warranty as from the date of replacement.</li><li>This warranty is additional to and without prejudice to any further or specific terms of warranties offered by supplier or applicable in respect of the work.</li></ul></li><li><strong>Compliance to Laws and Ethics </strong>- In the performance of any purchase agreement, supplier shall take all reasonable steps to ensure full compliance with all laws and regulations of the KSA as well as any other applicable laws or international obligations</li></ul><p>&nbsp;</p>
        `)
    }, []);

    return (
        <div className="App">
            <h1>ckEditor 5</h1>

            <Editor
                name="description"
                onChange={(data) => {
                    setData(data);
                }}
                value={data}
                editorLoaded={editorLoaded}
            />
            {JSON.stringify(data)}

            <button onClick={handlePrintingCur}>Print</button>

            <div ref={componentRef} style={{ pageBreakInside: 'auto' }} dangerouslySetInnerHTML={{ __html: data }}></div>

        </div>
    );
}
