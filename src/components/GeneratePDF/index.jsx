'use client'
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useRef } from "react"

const GeneratePDF = ({children}) => {
    const pdRef = useRef()

    const downloadPDF = () => {
        const input = pdRef.current
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4', true)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 30
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save('invoice.pdf')
        })
    }


    return (
        <>
            <div ref={pdRef}>
                <div>
                    <div></div>
                    <div></div>
                </div>
                {children}
                <h2>hahahahahahaha</h2>
            </div>
            <button onClick={downloadPDF}>
                Download PDF
            </button>
        </>
    )
}

export default GeneratePDF