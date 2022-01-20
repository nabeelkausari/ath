import React from "react";
import { WebPDFViewer } from "./PDFViewer";
import "../../../styles/PdfConsoleViewer.scss";
import { APP_URL } from "../../../../../../common/api/constants";
import { Button } from "../../../../../../app/components/Buttons/Button";
import { AUTH_KEY } from "../../../../../../common/api/auth";
import { getCookie } from "../../../../../../common/utils/storage";

export const PdfConsoleViewer = (props) => {
    const { document } = props;
    const handleOpenConsole = () => {
        const authorization = getCookie(AUTH_KEY)?.replace("Bearer ", "") || '';
        const resourceType = "NOTEBOOK";
        const url = APP_URL+"/lti?&resourceType="+resourceType+
                    '&token='+authorization+
                    '&resourceLink='+document?._links?.notebook_console?.href || '';
        window.open(url, "_blank", 'noreferrer');
    }
    return (
        <>
            <div className="pdf-console-viewer">
                <div className="pdf-console-viewer__open_console">
                    <div>
                        <h4>Learn & Apply - practice on the go</h4>
                    </div>
                    <div>
                        <Button
                            onClick={handleOpenConsole}
                            variant="primary"
                            size="xl"
                            className="open_console__btn"
                        >
                            OPEN CODING CONSOLE
                        </Button>
                    </div>
                </div>
            </div>
            <WebPDFViewer
                document={document}
            />
        </>
    );
};
