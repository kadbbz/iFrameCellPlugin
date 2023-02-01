/// <reference path="../Declarations/forguncy.d.ts" />
/// <reference path="../Declarations/forguncy.Plugin.d.ts" />

class iFrameCellPluginCellType extends Forguncy.Plugin.CellTypeBase {

    

    createContent() {
        this.content = $("<div style='width:100%;height:100%;'></div>");
        this.CellElement.CellType.FrameID = "ICCT_"+Math.floor((Math.random() * 99999999) + 1);
        return this.content;
    }

    Load(mode, Target) {
        Target = this.evaluateFormula(Target);
        this.set_Target(mode, Target)
    }

    GetCellValue(CellName, OutParamaterName) {
        CellName = this.evaluateFormula(CellName);
        let iFrameW = window.frames[this.CellElement.CellType.FrameID].contentWindow;
        let data = iFrameW.Forguncy.Page.getCell(CellName).getValue();
        ICCT_ReturnToParam(OutParamaterName, data);
    }

    SetCellValue(CellName, CellValue) {
        CellName = this.evaluateFormula(CellName);
        CellValue = this.evaluateFormula(CellValue);
        let iFrameW = window.frames[this.CellElement.CellType.FrameID].contentWindow;
        iFrameW.Forguncy.Page.getCell(CellName).setValue(CellValue);
    }

    set_Target(mode, target) {

        let frameId = this.CellElement.CellType.FrameID;

        if (mode.startsWith("Page")) {
            let urlRoot = Forguncy.Helper.SpecialPath.getBaseUrl();
            let targetUrl = window.location.protocol + '//' + window.location.host + urlRoot + target;
            let dom = '<iframe id="' + frameId + '" src="' + targetUrl + '" style="width: 100%; height: 100%; border: none;"></iframe>'
            this.content.html(dom);
        } else if (mode.startsWith("URL")) {
            let dom = '<iframe id="' + frameId + '" src="' + target + '" style="width: 100%; height: 100%; border: none;"></iframe>'
            this.content.html(dom);
        } else {
            this.content.html('<iframe id="' + frameId + '" style="width: 100%; height: 100%; border: none;"></iframe>');
            let iframeWindow = document.getElementById(frameId).contentWindow;
            iframeWindow.document.open();
            iframeWindow.document.write(target);
            iframeWindow.document.close();
        }
    }
}

Forguncy.Plugin.CellTypeHelper.registerCellType("iFrameCellPlugin.iFrameCellPluginCellType, iFrameCellPlugin", iFrameCellPluginCellType);