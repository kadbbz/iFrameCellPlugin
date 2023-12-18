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

    if (iFrameW.Forguncy && iFrameW.Forguncy.Page) {
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


var ICCT_buildAttributes = function (context, pairs) {

    var result = "";
    var hasStyle = false;

    if (pairs && pairs instanceof Array) {

        pairs.forEach(function (v) {
            var pNameP = context.evaluateFormula(v.Name);
            var pValueP = context.evaluateFormula(v.Value);

            result += " ";
            result += pNameP;
            result += "='";
            result += pValueP;
            result += "' ";

            if (pNameP.toLowerCase() === "style") {
                hasStyle = true;
            }
        });
    }

    if (!hasStyle) {
        result += " style='width:100%; height:100%; border: none;'";
    }

    return result;

}


class iFrameCellPluginCellType extends Forguncy.Plugin.CellTypeBase {


    createContent() {
        this.content = $("<div style='width:100%;height:100%;'></div>");
        this.CellElement.CellType.FrameID = "ICCT_" + Math.floor((Math.random() * 99999999) + 1);
        return this.content;
    }

    Load(mode, Target, AttributesPairs) {
        Target = this.evaluateFormula(Target);
        this.set_Target(mode, Target, AttributesPairs)
    }

    GetCellValue(CellName, OutParamaterName) {
        CellName = this.evaluateFormula(CellName);
        let iFrameW = window.frames[this.CellElement.CellType.FrameID].contentWindow;
        let data = iFrameW.Forguncy.Page.getCell(CellName).getValue();
        return {
            CellValue: data
        };
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

            console.log('Registry post-load task for Setting value to Cell ' + CellName);

            ICCT_RegistrySubPageTask(iFrameId, () => {
                iFrameW.Forguncy.Page.getCell(CellName).setValue(CellValue);
            });

        }
    }

    set_Target(mode, target, attrs) {

        let me = this;
        let frameId = this.CellElement.CellType.FrameID;

        let attr = ICCT_buildAttributes(me, attrs ? attrs.$values : null);

        if (mode.startsWith("Page")) {
            let urlRoot = Forguncy.Helper.SpecialPath.getBaseUrl();
            let targetUrl = window.location.protocol + '//' + window.location.host + urlRoot + target;
            let dom = '<iframe id="' + frameId + '" src="' + targetUrl + '" onload="ICCT_iFrameLoad(\'' + frameId + '\');" ' + attr + '></iframe>'
            this.content.html(dom);
        } else if (mode.startsWith("URL")) {
            let dom = '<iframe id="' + frameId + '" src="' + target + '" onload="ICCT_iFrameLoad(\'' + frameId + '\');" ' + attr + '></iframe>'
            this.content.html(dom);
        } else {
            this.content.html('<iframe id="' + frameId + '" onload="ICCT_iFrameLoad(\'' + frameId + '\');" ' + attr + '></iframe>');
            let iframeWindow = document.getElementById(frameId).contentWindow;
            iframeWindow.document.open();
            iframeWindow.document.write(target);
            iframeWindow.document.close();
        }
    }
}

Forguncy.Plugin.CellTypeHelper.registerCellType("iFrameCellPlugin.iFrameCellPluginCellType, iFrameCellPlugin", iFrameCellPluginCellType);