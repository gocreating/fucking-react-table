import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { number, boolean } from '@storybook/addon-knobs'
import generateColumns from '../utils/generateColumns'
import generateRows from '../utils/generateRows'
import FuckTable from '../lib'
import DemoTable from './DemoTable'

export const ContentBefore = () => (
  <>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare sapien et augue pulvinar hendrerit. Etiam ligula enim, elementum at faucibus bibendum, ullamcorper non ante. Etiam ac viverra ligula, non commodo dolor. Integer a ultrices turpis. Ut blandit tellus vel libero iaculis, quis fermentum dui vestibulum. Aenean eros leo, vulputate eget viverra sit amet, porttitor id arcu. Aliquam luctus dolor lacus, vel eleifend mauris convallis sed. Mauris tincidunt condimentum lorem, nec congue eros fermentum vitae. Praesent molestie, leo dictum hendrerit lacinia, est elit euismod justo, sit amet venenatis dui nisi a nibh. Suspendisse nec nunc sodales, tincidunt eros id, tincidunt odio. Duis ut finibus eros, a varius massa. Fusce ultrices tincidunt hendrerit.</p>
    <p>Fusce turpis leo, tempor vel enim in, vestibulum suscipit risus. Aliquam eu turpis ornare, aliquet elit vel, tincidunt libero. Sed suscipit felis et aliquam interdum. Aliquam sed volutpat eros, et iaculis ligula. Curabitur sed lorem ligula. Phasellus vitae ultricies orci, tincidunt ornare est. Mauris faucibus leo id finibus placerat. Praesent sed lorem scelerisque velit volutpat pretium nec porttitor ipsum. Sed nec sem in est vehicula consequat laoreet eu odio. Aenean tincidunt mi in justo mollis, in imperdiet nisl sollicitudin. Praesent a pulvinar ante. Cras aliquam, orci vel pulvinar aliquam, ante elit elementum justo, vitae ornare nibh nunc quis nisl. Maecenas mauris ante, posuere in quam eget, mollis vehicula massa. Morbi quis tristique lectus. Nam pulvinar purus ut neque vestibulum efficitur ut ac velit. Integer fermentum quis mauris vitae euismod.</p>
    <p>Aenean semper nec mauris a posuere. Etiam quis magna gravida purus ullamcorper iaculis. Donec lobortis dolor ac magna ullamcorper, a dignissim justo pellentesque. Integer a bibendum nunc. Mauris tempus urna tincidunt augue tempor vehicula. Pellentesque sit amet nisi nulla. Fusce at orci vitae dolor auctor congue sed vitae est. Cras luctus mi vestibulum varius bibendum. Nulla ullamcorper vehicula tempus. Donec a ante varius ex ultricies dictum. Quisque tempus eros ut urna porttitor placerat. Mauris consectetur, urna rutrum sodales faucibus, turpis lorem pellentesque turpis, et finibus mi sapien eu ligula. Duis eget bibendum nisi, eget lobortis odio. Donec enim sapien, semper et sapien quis, feugiat mollis purus.</p>
  </>
)

export const ContentAfter = () => (
  <>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue dictum libero euismod porta. In a egestas eros. Donec id sagittis justo, et eleifend felis. Curabitur at ante id urna lobortis ultrices pulvinar sit amet metus. Donec eu sem in nulla sagittis dapibus sit amet quis elit. Donec vulputate sagittis tortor quis auctor. Mauris accumsan, libero et accumsan facilisis, nisl mi vehicula urna, a sollicitudin nulla dolor ac risus. Quisque tempus lectus justo, ut fermentum lorem sodales et. Pellentesque ut consequat purus. Ut dui mauris, rutrum nec aliquam nec, malesuada ut lacus. Pellentesque pulvinar vehicula egestas. Curabitur nec felis lorem. Donec eu nulla in sapien blandit tincidunt. Nam ultrices posuere lectus nec ornare.</p>
    <p>Vivamus vel tempus est. In nunc orci, rhoncus ac nisl placerat, bibendum bibendum ex. Mauris quam urna, dignissim ac sem et, elementum dignissim neque. Nunc scelerisque iaculis fringilla. Sed dignissim consectetur erat, id ullamcorper massa dapibus a. Ut id nunc ut tortor viverra elementum. Integer sed est at nulla imperdiet sollicitudin. Ut a fringilla justo, sed finibus elit. Mauris eu erat eleifend, viverra lorem eget, tincidunt odio. Donec accumsan, turpis eget molestie lacinia, nibh tellus euismod ligula, sed tempus risus tellus at orci. Nulla facilisi. Praesent volutpat ultrices metus. Suspendisse in lectus sem.</p>
    <p>Etiam feugiat consectetur erat, ut vestibulum felis gravida vel. Vivamus pretium condimentum ex at aliquam. Sed eu metus in urna ornare accumsan vel vel erat. Ut mollis ipsum et diam pellentesque, nec fringilla tortor posuere. Donec ut felis non ipsum ullamcorper pellentesque sit amet at velit. Aliquam vel fermentum ex. Curabitur sit amet auctor velit. Fusce risus tellus, malesuada ac dui et, vestibulum suscipit neque. In id quam malesuada, luctus diam in, mollis elit. Curabitur id varius nisi, in pharetra odio. Duis viverra purus eros, sit amet venenatis urna aliquam ac. Ut pharetra metus erat, eu rutrum elit auctor interdum. Donec convallis ullamcorper condimentum.</p>
    <p>Proin varius leo id semper dictum. Maecenas pellentesque fermentum lorem sed congue. Aenean ornare, metus ac tempor interdum, orci sem elementum lacus, interdum ultricies arcu justo non libero. Sed vel velit sed tellus efficitur tincidunt dapibus non ligula. Praesent dui justo, placerat nec bibendum at, vestibulum quis dolor. Cras venenatis euismod pulvinar. Etiam ornare scelerisque purus sed fringilla. Cras pharetra feugiat justo eget placerat. Nulla non metus sit amet lorem sagittis pharetra non quis sem. Integer luctus posuere elit, non malesuada nibh pharetra vel. Morbi tincidunt lobortis nibh, a rutrum risus scelerisque quis. Sed vel placerat velit. Pellentesque egestas, orci et placerat feugiat, mauris dolor volutpat sapien, sit amet aliquet nisl lacus ut felis.</p>
    <p>Aliquam quis scelerisque sapien, posuere rutrum augue. Cras imperdiet nunc lectus, eget malesuada enim scelerisque vitae. Pellentesque congue a ex dictum tempor. Maecenas imperdiet consequat ex, sed cursus velit pharetra eu. Curabitur nunc purus, pharetra eu mollis a, ullamcorper ac dolor. Donec sit amet mauris nec ligula accumsan molestie. Aliquam vehicula dapibus sagittis. Proin in ipsum sem. Sed orci odio, euismod ut est quis, aliquet pretium sem. Aenean fermentum maximus mi eu auctor.</p>
    <p>Pellentesque vel nunc finibus, ultricies lorem at, fermentum libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi eu scelerisque lorem. Sed aliquet est in diam sollicitudin, a accumsan eros elementum. Curabitur sit amet consequat lacus. Fusce imperdiet urna eget interdum bibendum. Mauris commodo, nisl vel posuere interdum, justo erat commodo neque, pulvinar viverra est enim non mi. Nulla commodo varius ipsum, interdum sagittis neque tincidunt a. Sed leo enim, malesuada id aliquam vitae, imperdiet ut urna. Vestibulum mollis velit non est tempor iaculis. Vestibulum sollicitudin maximus orci quis hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim at ligula nec scelerisque. Suspendisse condimentum porta urna, a aliquet leo iaculis in.</p>
    <p>Mauris a dui et erat imperdiet facilisis. Maecenas mauris est, congue vel felis congue, posuere malesuada risus. Duis tempus tortor et blandit porta. Donec felis quam, euismod ac tortor interdum, suscipit ultricies quam. Aenean volutpat maximus justo, nec porta turpis. Sed eget ex ipsum. Vivamus odio ante, mollis at tempor non, tempor sit amet nisl. Morbi ullamcorper ipsum in mauris accumsan condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam semper congue venenatis.</p>
    <p>Curabitur molestie sapien eget quam faucibus rutrum. Suspendisse fringilla consectetur quam non blandit. Suspendisse hendrerit molestie euismod. Nullam quis libero quam. Vivamus interdum lectus sit amet purus auctor, a scelerisque massa pretium. Maecenas sed ex et nunc congue finibus non quis nibh. Ut rutrum, nisi a varius posuere, quam metus egestas est, vel rhoncus quam eros vitae sem. Suspendisse blandit pellentesque egestas. Cras maximus ullamcorper magna, nec vehicula mauris ultrices vitae. Proin suscipit non massa ut vulputate. Maecenas felis sapien, pulvinar a lobortis in, consequat sit amet enim. Ut convallis tellus ut scelerisque hendrerit. Etiam sit amet ullamcorper mauris. Quisque ut euismod sem, at tristique orci.</p>
    <p>Proin varius leo id semper dictum. Maecenas pellentesque fermentum lorem sed congue. Aenean ornare, metus ac tempor interdum, orci sem elementum lacus, interdum ultricies arcu justo non libero. Sed vel velit sed tellus efficitur tincidunt dapibus non ligula. Praesent dui justo, placerat nec bibendum at, vestibulum quis dolor. Cras venenatis euismod pulvinar. Etiam ornare scelerisque purus sed fringilla. Cras pharetra feugiat justo eget placerat. Nulla non metus sit amet lorem sagittis pharetra non quis sem. Integer luctus posuere elit, non malesuada nibh pharetra vel. Morbi tincidunt lobortis nibh, a rutrum risus scelerisque quis. Sed vel placerat velit. Pellentesque egestas, orci et placerat feugiat, mauris dolor volutpat sapien, sit amet aliquet nisl lacus ut felis.</p>
  </>
)

const defineProps = (overwriteValues) => {
  const defaultValues = {
    columnCount: 10,
    rowCount: 50,
    freezeToColumnIndex: undefined,
    maxHeight: undefined,
    throttleWait: 16,
    preRenderRowCount: 0,
    globalStickyHeader: false,
    localStickyHeader: false,
    enableStickyHeaderShadow: false,
    enableFreezeColumnShadow: false,
  }
  const initialValues = Object.assign({}, defaultValues, overwriteValues)

  // groups
  const demoTableGroup = 'Demo Table'
  const propsGroup = 'Props'

  // demo props
  const columnCount = number('Columns', initialValues.columnCount, {}, demoTableGroup)
  const rowCount = number('Rows', initialValues.rowCount, {}, demoTableGroup)
  const columns = generateColumns(columnCount)
  const freezeToColumnIndex = number(
    'Freeze To Column Index', initialValues.freezeToColumnIndex, {}, demoTableGroup
  )

  // fucking-react-table props
  const data = generateRows(rowCount, columns)
  const maxHeight = number('maxHeight', initialValues.maxHeight, {}, propsGroup)
  const throttleWait = number('throttleWait', initialValues.throttleWait, {}, propsGroup)
  const preRenderRowCount = number('preRenderRowCount', initialValues.preRenderRowCount, {}, propsGroup)
  const globalStickyHeader = boolean('globalStickyHeader', initialValues.globalStickyHeader, propsGroup)
  const localStickyHeader = boolean('localStickyHeader', initialValues.localStickyHeader, propsGroup)
  const enableStickyHeaderShadow = boolean('enableStickyHeaderShadow', initialValues.enableStickyHeaderShadow, propsGroup)
  const enableFreezeColumnShadow = boolean('enableFreezeColumnShadow', initialValues.enableFreezeColumnShadow, propsGroup)

  return {
    columnCount,
    rowCount,
    columns,
    freezeToColumnIndex,

    data,
    maxHeight,
    throttleWait,
    preRenderRowCount,
    globalStickyHeader,
    localStickyHeader,
    enableStickyHeaderShadow,
    enableFreezeColumnShadow,
  }
}

const createScenario = (overwriteValues) => {
  const { columns, ...props } = defineProps(overwriteValues)
  return (
    <div>
      <ContentBefore />
      <DemoTable
        columns={columns}
        headerRowHeight={44}
        rowHeight={62}
        {...props}
      />
      <ContentAfter />
    </div>
  )
}

const negativePreRenderInfo = {
  info: {
    disable: false,
    text: `
      \`preRenderRowCount\` can be negative!
    `,
  },
}

/*
 #################
 ## Quick Start ##
 #################
*/

storiesOf('Quick Start|Default', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Small Table', () => {
    const data = [
      {
        id: 'a',
        value: 'Apple',
      },
      {
        id: 'b',
        value: 'Banana',
      },
    ]
    const Tr = FuckTable.Tr
    const Th = FuckTable.Th
    const Td = FuckTable.Td

    return (
      <FuckTable
        data={data}
        headerRowHeight={60}
        rowHeight={80}
        renderHeader={() => (
          <Tr>
            <Th cellWidth={100}>ID</Th>
            <Th cellWidth={150}>Fruit</Th>
          </Tr>
        )}
        renderRow={row => (
          <Tr key={row.id}>
            <Td cellWidth={100}>{row.id}</Td>
            <Td cellWidth={150}>{row.value}</Td>
          </Tr>
        )}
      />
    )
  })
  .add('Small Table without Header', () => {
    const data = [
      {
        id: 'a',
        value: 'Apple',
      },
      {
        id: 'b',
        value: 'Banana',
      },
    ]
    const Tr = FuckTable.Tr
    const Td = FuckTable.Td

    return (
      <FuckTable
        data={data}
        headerRowHeight={0}
        rowHeight={80}
        renderRow={row => (
          <Tr key={row.id}>
            <Td cellWidth={100}>{row.id}</Td>
            <Td cellWidth={150}>{row.value}</Td>
          </Tr>
        )}
      />
    )
  })
  .add('Big Table', () => {
    const columns = generateColumns(10)
    const data = generateRows(10000, columns)
    const Tr = FuckTable.Tr
    const Th = FuckTable.Th
    const Td = FuckTable.Td

    return (
      <FuckTable
        data={data}
        headerRowHeight={60}
        rowHeight={80}
        renderHeader={() => (
          <Tr>
            {columns.map((column, columnIndex) => (
              <Th
                key={column.id}
                cellWidth={column.width}
              >
                {column.content}
              </Th>
            ))}
          </Tr>
        )}
        renderRow={row => (
          <Tr key={row.id}>
            {columns.map((column, columnIndex) => (
              <Td
                key={`row-${row}.id}-col-${column.id}`}
                cellWidth={column.width}
              >
                {row[column.id]}
              </Td>
            ))}
          </Tr>
        )}
      />
    )
  })
  .add('Big Table without Header', () => {
    const columns = generateColumns(10)
    const data = generateRows(10000, columns)
    const Tr = FuckTable.Tr
    const Td = FuckTable.Td

    return (
      <FuckTable
        data={data}
        headerRowHeight={0}
        rowHeight={80}
        renderRow={row => (
          <Tr key={row.id}>
            {columns.map((column, columnIndex) => (
              <Td
                key={`row-${row}.id}-col-${column.id}`}
                cellWidth={column.width}
              >
                {row[column.id]}
              </Td>
            ))}
          </Tr>
        )}
      />
    )
  })

const columns_10 = generateColumns(10)
const data_100 = generateRows(100, columns_10)
const createThemedScenario = (Table, Tr, Th, Td) => {
  return (
    <Table
      data={data_100}
      headerRowHeight={60}
      rowHeight={80}
      renderHeader={() => (
        <Tr>
          {columns_10.map(column => (
            <Th
              key={column.id}
              cellWidth={column.width}
            >
              {column.content}
            </Th>
          ))}
        </Tr>
      )}
      renderRow={row => (
        <Tr key={row.id}>
          {columns_10.map(column => (
            <Td
              key={`row-${row}.id}-col-${column.id}`}
              cellWidth={column.width}
            >
              {row[column.id]}
            </Td>
          ))}
        </Tr>
      )}
    />
  )
}

storiesOf('Quick Start|Custom Theme', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Dark', () => {
    const Table = styled(FuckTable)`
      background-color: #26282b;
    `
    const Tr = styled(FuckTable.Tr)`
      background-color: rgb(53, 55, 58);
    `
    const Th = styled(FuckTable.Th)`
      background-color: rgb(62, 63, 66);
      color: rgb(156, 157, 158);
    `
    const Td = styled(FuckTable.Td)`
      background-color: rgb(53, 55, 58);
      color: #ffffff;
    `
    return createThemedScenario(Table, Tr, Th, Td)
  })
  // FIXME: css nth selector is not suitable for virtualized rows
  .add('Stripped', () => {
    const Table = styled(FuckTable)`
    `
    const Tr = styled(FuckTable.Tr)`
      &:nth-of-type(even) td {
        background-color: #ddd;
      }
      &:nth-of-type(odd) td {
        background-color: #eee;
      }
    `
    const Th = styled(FuckTable.Th)`
      background-color: #555;
      color: #fff;
    `
    const Td = styled(FuckTable.Td)`
    `
    return createThemedScenario(Table, Tr, Th, Td)
  })
  .add('Bordered', () => {
    const Table = styled(FuckTable)`
      background-color: #efefef;
    `
    const Tr = styled(FuckTable.Tr)`
    `
    const Th = styled(FuckTable.Th)`
      border: 5px solid #bbb;
      padding: 10px;
      text-align: center;
    `
    const Td = styled(FuckTable.Td)`
      border: 5px solid #bbb;
      padding: 10px;
      text-align: center;
    `
    return createThemedScenario(Table, Tr, Th, Td)
  })

/*
 #################
 ## Full Height ##
 #################
*/

storiesOf('Full Height|Virtualized Rows/Throttle Render Frequency', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Default (16ms)', () => createScenario({
    throttleWait: 16,
  }))
  .add('Custom (0ms)', () => createScenario({
    throttleWait: 0,
  }))
  .add('Custom (1000ms)', () => createScenario({
    throttleWait: 1000,
  }))

storiesOf('Full Height|Virtualized Rows/Pre-render Rows', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Default (0)', () => createScenario({
    preRenderRowCount: 0,
  }))
  .add('Custom (10)', () => createScenario({
    preRenderRowCount: 10,
  }))
  .add('Negative (-2)', () => createScenario({
    preRenderRowCount: -2,
  }), negativePreRenderInfo)

storiesOf('Full Height|Sticky Header', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Basic (Global Sticky)', () => createScenario({
    globalStickyHeader: true,
  }))

storiesOf('Full Height|Sticky Header', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('With Shadow', () => createScenario({
    globalStickyHeader: true,
    enableStickyHeaderShadow: true,
  }))

storiesOf('Full Height|Freeze Columns', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Freeze to column 0', () => createScenario({
    freezeToColumnIndex: 0,
  }))
  .add('Freeze to column 3', () => createScenario({
    freezeToColumnIndex: 3,
  }))
  .add('With shadow attached to column 0', () => createScenario({
    freezeToColumnIndex: 0,
    enableFreezeColumnShadow: true,
  }))
  .add('With shadow attached to column 3', () => createScenario({
    freezeToColumnIndex: 3,
    enableFreezeColumnShadow: true,
  }))

storiesOf('Full Height|Sticky Header & Freeze Columns', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Demo', () => createScenario({
    globalStickyHeader: true,
    enableStickyHeaderShadow: true,
    freezeToColumnIndex: 2,
    enableFreezeColumnShadow: true,
  }))

/*
##################
## Limit Height ##
##################
*/

storiesOf('Limit Height|Virtualized Rows/Throttle Render Frequency', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Default (16ms)', () => createScenario({
    maxHeight: 500,
    throttleWait: 16,
  }))
  .add('Custom (0ms)', () => createScenario({
    maxHeight: 500,
    throttleWait: 0,
  }))
  .add('Custom (1000ms)', () => createScenario({
    maxHeight: 500,
    throttleWait: 1000,
  }))

storiesOf('Limit Height|Virtualized Rows/Pre-render Rows', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Default (0)', () => createScenario({
    maxHeight: 500,
    preRenderRowCount: 0,
  }))
  .add('Custom (10)', () => createScenario({
    maxHeight: 500,
    preRenderRowCount: 10,
  }))
  .add('Negative (-2)', () => createScenario({
    maxHeight: 500,
    preRenderRowCount: -2,
  }), negativePreRenderInfo)

storiesOf('Limit Height|Sticky Header', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Basic (Local Sticky Only)', () => createScenario({
    maxHeight: 500,
    localStickyHeader: true,
  }))

storiesOf('Limit Height|Sticky Header', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Local Sticky & Global Sticky', () => createScenario({
    maxHeight: 500,
    localStickyHeader: true,
    globalStickyHeader: true,
  }))

storiesOf('Limit Height|Sticky Header', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('With Shadow', () => createScenario({
    maxHeight: 500,
    localStickyHeader: true,
    enableStickyHeaderShadow: true,
  }))

storiesOf('Limit Height|Freeze Columns', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Freeze to column 0', () => createScenario({
    maxHeight: 500,
    freezeToColumnIndex: 0,
  }))
  .add('Freeze to column 3', () => createScenario({
    maxHeight: 500,
    freezeToColumnIndex: 3,
  }))
  .add('With shadow attached to column 0', () => createScenario({
    maxHeight: 500,
    freezeToColumnIndex: 0,
    enableFreezeColumnShadow: true,
  }))
  .add('With shadow attached to column 3', () => createScenario({
    maxHeight: 500,
    freezeToColumnIndex: 3,
    enableFreezeColumnShadow: true,
  }))

storiesOf('Limit Height|Sticky Header & Freeze Columns', module)
  .addParameters({
    options: { panelPosition: 'right' },
    info: { disable: true },
  })
  .add('Demo', () => createScenario({
    maxHeight: 500,
    localStickyHeader: true,
    enableStickyHeaderShadow: true,
    freezeToColumnIndex: 2,
    enableFreezeColumnShadow: true,
  }))
