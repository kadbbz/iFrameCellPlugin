using iFrameCellPlugin.Designer.DrawingControl;
using GrapeCity.Forguncy.CellTypes;
using System.Windows;

namespace iFrameCellPlugin.Designer
{
    public class iFrameCellPluginCellTypeDesigner : CellTypeDesigner<iFrameCellPluginCellType>
    {
        public override FrameworkElement GetDrawingControl(ICellInfo cellInfo, IDrawingHelper drawingHelper)
        {
            return new iFrameCellPluginCellTypeDrawingControl(this.CellType, cellInfo, drawingHelper);
        }
    }
}
