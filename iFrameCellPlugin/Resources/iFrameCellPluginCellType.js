/// <reference path="../Declarations/forguncy.d.ts" />
/// <reference path="../Declarations/forguncy.Plugin.d.ts" />

var currentWindow = window;
currentWindow.ICCT_PendingTaskList = []

var ICCT_RegistrySubPageTask = function (iFrameId, task) {
    currentWindow.ICCT_PendingTaskList.push({
        fid: iFrameId,
        exec: task,
        done: false
    });

    console.log('Pending post-load task registry for ' + iFrameId);
};

var ICCT_ExecuteTasks = function (iFrameId) {

    currentWindow.ICCT_PendingTaskList.forEach((task) => {
        if (task.fid === iFrameId && !task.done) {
            task.exec();
            task.done = true;
        }
    });

    console.log('All post-load tasks are exectued within iFrame ' + iFrameId);

}

var ICCT_iFrameLoad = function (id) {

    let iFrameW = currentWindow.frames[id].contentWindow

   

    if (iFrameW.Forguncy.Page) {
        if (iFrameW.Forguncy.PageBuilder.pageTotallyLoaded) {
            ICCT_ExecuteTasks(id);
        } else {
            iFrameW.Forguncy.Page.bind("pageDefaultDataLoaded", function () {
                ICCT_ExecuteTasks(id);
            });
        }
    } else {
        console.log('iFrameLoad event fired only on forguncy page');
    }
};



class iFrameCellPluginCellType extends Forguncy.Plugin.CellTypeBase {


    createContent() {
        this.content = $("<div style='width:100%;height:100%;'></div>");
        this.CellElement.CellType.FrameID = "ICCT_" + Math.floor((Math.random() * 99999999) + 1);
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
        CellName = this.evaluateFormula(CellName)
        CellValue = this.evaluateFormula(CellValue)
        let iFrameId = this.CellElement.CellType.FrameID
        let iFrameW = window.frames[iFrameId].contentWindow

        if (iFrameW.Forguncy && iFrameW.Forguncy.PageBuilder && iFrameW.Forguncy.PageBuilder.pageTotallyLoaded) {

            console.log('Forguncy page is loaded, call set value to cell now.');
            iFrameW.Forguncy.Page.getCell(CellName).setValue(CellValue);

        } else {

            console.log('Registry post-load task for Setting value to Cell '+CellName);

            ICCT_RegistrySubPageTask(iFrameId, () => {
                iFrameW.Forguncy.Page.getCell(CellName).setValue(CellValue);
            });

        }
    }

    set_Target(mode, target) {

        let frameId = this.CellElement.CellType.FrameID;

        if (mode.startsWith("Page")) {
            let urlRoot = Forguncy.Helper.SpecialPath.getBaseUrl();
            let targetUrl = window.location.protocol + '//' + window.location.host + urlRoot + target;
            let dom = '<iframe id="' + frameId + '" src="' + targetUrl + '" style="width: 100%; height: 100%; border: none;" onload="ICCT_iFrameLoad(\'' + frameId + '\');"></iframe>'
            this.content.html(dom);
        } else if (mode.startsWith("URL")) {
            let dom = '<iframe id="' + frameId + '" src="' + target + '" style="width: 100%; height: 100%; border: none;" onload="ICCT_iFrameLoad(\'' + frameId + '\');"></iframe>'
            this.content.html(dom);
        } else {
            this.content.html('<iframe id="' + frameId + '" style="width: 100%; height: 100%; border: none;" onload="ICCT_iFrameLoad(\'' + frameId + '\');"></iframe>');
            let iframeWindow = document.getElementById(frameId).contentWindow;
            iframeWindow.document.open();
            iframeWindow.document.write(target);
            iframeWindow.document.close();
        }
    }
}

Forguncy.Plugin.CellTypeHelper.registerCellType("iFrameCellPlugin.iFrameCellPluginCellType, iFrameCellPlugin", iFrameCellPluginCellType);