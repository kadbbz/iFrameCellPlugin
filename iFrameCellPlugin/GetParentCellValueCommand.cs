using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.ComponentModel;

namespace iFrameCellPlugin
{
    [Icon("pack://application:,,,/iFrameCellPlugin;component/Resources/icct_trans.png")]
    [Category("页面容器（iFrame）")]
    public class GetParentCellValueCommand : Command
    {
        [DisplayName("单元格名称")]
        [FormulaProperty]
        public object CellName { get; set; }

        [DisplayName("将结果返回到变量")]
        [ResultToProperty]
        public string OutParamaterName { get; set; }

        public override string ToString()
        {
            return "获取父页面单元格的值";
        }
    }
}
