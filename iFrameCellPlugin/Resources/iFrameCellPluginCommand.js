/// <reference path="../Declarations/forguncy.d.ts" />
/// <reference path="../Declarations/forguncy.Plugin.d.ts" />

var ICCT_NOT_IN_IFRAME = "该页面没有运行在类型为“页面容器（iFrame）”的单元格中。";

var ICCT_ReturnToParam = function (OutParamaterName, data) {
    if (OutParamaterName && OutParamaterName != "") {
        Forguncy.CommandHelper.setVariableValue(OutParamaterName, data);
    } else {
        console.log("OutParamaterName was not set, the value is: " + JSON.stringify(data));
    }
};

class GetParentCellValueCommand extends Forguncy.Plugin.CommandBase {
    execute() {

        if (self == top) {
            alert(ICCT_NOT_IN_IFRAME);
        } else {
            let name = this.evaluateFormula(this.CommandParam.CellName);
            let data = window.parent.Forguncy.Page.getCell(name).getValue();

            ICCT_ReturnToParam(this.CommandParam.OutParamaterName, data);
        }

    }
}

Forguncy.Plugin.CommandFactory.registerCommand("iFrameCellPlugin.GetParentCellValueCommand, iFrameCellPlugin", GetParentCellValueCommand);


class SetParentCellValueCommand extends Forguncy.Plugin.CommandBase {
    execute() {

        if (self == top) {
            alert(ICCT_NOT_IN_IFRAME);
        } else {
            let name = this.evaluateFormula(this.CommandParam.CellName);
            let value = this.evaluateFormula(this.CommandParam.Value);

            window.parent.Forguncy.Page.getCell(name).setValue(value);
        }
    }
}

Forguncy.Plugin.CommandFactory.registerCommand("iFrameCellPlugin.SetParentCellValueCommand, iFrameCellPlugin", SetParentCellValueCommand);

