using System;
using System.Collections.Generic;
using GrapeCity.Forguncy.Plugin;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace iFrameCellPlugin
{
    public class AttributeValueObject : ObjectPropertyBase
    {
        [FormulaProperty]
        [DisplayName("属性名")]
        public object Name { get; set; }

        [DisplayName("值")]
        [FormulaProperty]
        public object Value { get; set; }
    }
}
