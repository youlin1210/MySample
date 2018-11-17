<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/TR/xhtml1/strict">
  <xsl:output method="html"/>
  
  <xsl:template match="/">
  <html>
        <head>
        <style type="text/css">
    /* 
	Web20 Table Style
	written by Netway Media, http://www.netway-media.com
*/
    table
    {
        border-collapse: collapse;
        border: 1px solid #666666;
        font: normal 11px verdana, arial, helvetica, sans-serif;
        color: #363636;
        background: #f6f6f6;
        text-align: left;
    }
    caption
    {
        text-align: center;
        font: bold 16px arial, helvetica, sans-serif;
        background: transparent;
        padding: 6px 4px 8px 0px;
        color: #CC00FF;
        text-transform: uppercase;
    }
    thead, tfoot
    {
        background: url(bg1.png) repeat-x;
        text-align: left;
        height: 30px;
    }
    thead th, tfoot th
    {
        padding: 5px;
    }
    table a
    {
        color: #333333;
        text-decoration: none;
    }
    table a:hover
    {
        text-decoration: underline;
    }
    tr.odd
    {
        background: #f1f1f1;
    }
    tbody th, tbody td
    {
        padding: 5px;
        padding-left: 10px;
    }
    td.sectionheader
    {
        color: Navy;
        font-size: 20px;
        font-weigth: bold;
        text-align: center;
    }
</style>
        </head>
        <body>
    <xsl:apply-templates select="//SourceMonitorComplexitySummary" />					
    </body>
    </html>
  </xsl:template>
  
 <!-- The most complex methods -->
  <xsl:template match="SourceMonitorComplexitySummary">
    <table class="section-table" cellpadding="2" cellspacing="0" border="0" width="98%">
      <!--<colgroup>
        <col width="300px" />
        <col width="50px" />
        <col />
        <col width="50px" />
      </colgroup>-->
      <tr>
        <td class="sectionheader" colspan="4">
           SourceMonitor - <xsl:value-of select="count(MostComplexMethods/Method)" /> Most Complex Methods
        </td>
      </tr>
      <tr>
        <th class="header-label">
          Complexity
        </th>
        <th class="header-label">
          File
        </th>
        <th class="header-label">
          Method
        </th>        
        <th class="header-label">
          Line
        </th>
      </tr>
      <xsl:apply-templates select="MostComplexMethods/Method" />
    </table>
    
    <br/>
    
    <!-- The most deeply nested code blocks -->
    <table class="section-table" cellpadding="2" cellspacing="0" border="0" width="98%">
      <!--<colgroup>
        <col width="50px"/>
        <col />
        <col width="50px" />
      </colgroup>-->
      <tr>
        <td class="sectionheader" colspan="4">           
           SourceMonitor - <xsl:value-of select="count(MostDeeplyNestedCode/Block)" /> Most Deeply Nested Code Blocks
        </td>
      </tr>
      <tr>
        <th class="header-label">
          Depth
        </th>
        <th class="header-label">
          File
        </th>
        <th class="header-label">
          Line
        </th>
      </tr>
      <xsl:apply-templates select="MostDeeplyNestedCode/Block" />
    </table>
  </xsl:template>

  <!-- Complex Method List -->
  <xsl:template match="MostComplexMethods/Method">
      <tr>
        <xsl:if test="position() mod 2 = 1">
          <xsl:attribute name="class">section-oddrow odd</xsl:attribute>          
        </xsl:if>
        <td>
          <xsl:value-of select="Complexity" />
        </td>
        <td >
          <xsl:value-of select="File" />
        </td>
        <td>
          <xsl:value-of select="Name"/>
        </td>        
        <td>
          <xsl:value-of select="Line" />
        </td>
      </tr>
  </xsl:template>

  <!-- Deeply Nested Blocks List -->
  <xsl:template match="MostDeeplyNestedCode/Block">
      <tr>
        <xsl:if test="position() mod 2 = 1">
          <xsl:attribute name="class">section-oddrow odd</xsl:attribute>
        </xsl:if>
        <td>
          <xsl:value-of select="Depth" />
        </td>
        <td>
          <xsl:value-of select="File" />
        </td>
        <td>
          <xsl:value-of select="Line" />
        </td>
      </tr>
  </xsl:template>

</xsl:stylesheet>
