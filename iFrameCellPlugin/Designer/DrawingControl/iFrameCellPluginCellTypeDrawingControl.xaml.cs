using GrapeCity.Forguncy.CellTypes;
using System.Windows.Controls;

namespace iFrameCellPlugin.Designer.DrawingControl
{
    public partial class iFrameCellPluginCellTypeDrawingControl : UserControl
    {
        public iFrameCellPluginCellTypeDrawingControl(iFrameCellPluginCellType cellType, ICellInfo cellInfo, IDrawingHelper drawingHelper)
        {
            this.DataContext = new iFrameCellPluginCellTypeDrawingControlViewModel(cellType, cellInfo, drawingHelper);

            InitializeComponent();
        }

        public class iFrameCellPluginCellTypeDrawingControlViewModel
        {
            iFrameCellPluginCellType _cellType;
            ICellInfo _cellInfo;
            IDrawingHelper _drawingHelper;
            public iFrameCellPluginCellTypeDrawingControlViewModel(iFrameCellPluginCellType cellType, ICellInfo cellInfo, IDrawingHelper drawingHelper)
            {
                _cellType = cellType;
                _cellInfo = cellInfo;
                _drawingHelper = drawingHelper;
            }
            public string Text { get => _cellType.ToString(); }
        }
    }
}
