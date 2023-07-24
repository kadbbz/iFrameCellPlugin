using GrapeCity.Forguncy.CellTypes;
using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace iFrameCellPlugin
{
    [Icon("pack://application:,,,/iFrameCellPlugin;component/Resources/icct_goto.png")]
    public class iFrameCellPluginCellType : CellType
    {
        [Browsable(false)]
        public int FrameID { get; set; }

        [RunTimeMethod]
        [DisplayName("加载子页面")]
        public void Load(
            [ItemDisplayName("目标类型")]
            [ComboProperty(ValueList = "Page：当前应用中的页面名称|URL：外部Web页面的URL地址|HTML：包含<html>标签的HTML语句")]
            string Mode,
            [ItemDisplayName("目标页面")]
            string Target)
        {
        }

        [RunTimeMethod]
        [DisplayName("读取子页面中单元格的值（需确保在子页面加载完成后调用）")]
        public GetCellValueResult GetCellValue(
            [ItemDisplayName("单元格名称")]
            string CellName)
        {
            return null;
        }

        [RunTimeMethod]
        [DisplayName("设置子页面中单元格的值")]
        public void SetCellValue(
            [ItemDisplayName("单元格名称")]
            string CellName,
            [ItemDisplayName("值")]
            string CellValue)
        {
        }

        public override string ToString()
        {
            return "可交互的页面容器（iFrame）";
        }

        [Browsable(false)]
        public List<Command> CommandList { get; set; } = new List<Command>();

        public IEnumerable<List<Command>> EnumSubCommands()
        {
            yield return CommandList;
        }
    }

    public class GetCellValueResult
    {
        [DisplayName("单元格的值")]
        public string CellValue { get; set; } = "CellValue";
    }
}
