using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.ComponentModel;

namespace iFrameCellPlugin
{
    [Icon("pack://application:,,,/iFrameCellPlugin;component/Resources/icct_trans.png")]
    [Category("页面容器（iFrame）")]
    public class SetParentCellValueCommand : Command
    {
        [DisplayName("单元格名称")]
        [FormulaProperty]
        public object CellName { get; set; }

        [DisplayName("值")]
        [FormulaProperty]
        public object Value { get; set; }

        public override string ToString()
        {
            return "设置父页面单元格的值";
        }
    }
}
