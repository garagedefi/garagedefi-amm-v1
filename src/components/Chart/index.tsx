import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { ButtonMenu, ButtonMenuItem, Card, CardBody, Text } from '@flash-swap/uikit'
import Overlay from 'components/Overlay'
import CurrencyLogo from 'components/CurrencyLogo'

const StyledContainer = styled.div`
  align-self: center;
  width: 650px;
  height: 400px;
`

const Row = styled.div`
  display: flex;
  flexdirection: row;
  alignitems: center;
  paddingbottom: 4px;
`

function Chart({ tokenA, tokenB }) {
  // Add chart
  const chartContainerRef: any = useRef()
  const chart: any = useRef()
  // const resizeObserver: any = useRef()
  const [showOverlay, setShowOverlay] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const chartSeries: any = useRef();

  const handleClick = (newIndex) => setIndex(newIndex)

  useEffect(() => {
    if (!chartContainerRef.current) {
      return
    }
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.width,
      height: 400,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    })
    chart.current.applyOptions({
      timeScale: {
        timeVisible: true,
      },
    })
  }, [])

  useEffect(() => {
    if (tokenA?.symbol === "CRO") {
      tokenA.address = "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23";
    }

    if (tokenB?.symbol === "CRO") {
      tokenB.address = "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23";
    }

    if (!tokenA || !tokenB || !tokenA?.address || !tokenB?.address) {
      return
    }

    function getSeconds(tabSelected) {
      switch (tabSelected) {
        case 0:
          return 300;
        case 1:
          return 900;
        case 2:
          return 3600;
        case 3:
          return 14400;
        case 4:
          return 86400;
        default:
          return 300;
      }
    }

    if (chartSeries.current){
      chart.current.removeSeries(chartSeries.current);
    }

    async function getCandleData(_tokenA, _tokenB) {
      const candle = chart.current.addCandlestickSeries({
        upColor: '#4bffb5',
        downColor: '#ff4976',
        borderDownColor: '#ff4976',
        borderUpColor: '#4bffb5',
        wickDownColor: '#838ca1',
        wickUpColor: '#838ca1',
      })
      chartSeries.current = candle;
      try {
        setShowOverlay(false)
        setLoading(true)
        const candleData = await fetch(
          `https://duckyapi.com/api/chart/aggregated/candle/${_tokenA.address}/${_tokenB.address}/${getSeconds(index)}`,
          {
            method: 'GET',
          }
        )
        const candleDataJson = await candleData.json()
        if (candleDataJson.length > 0) {
          candle.setData(candleDataJson)
          chart.current.timeScale().fitContent()
        }
      } catch (e) {
        setShowOverlay(true)
      } finally {
        setLoading(false)
      }
    }
    getCandleData(tokenA, tokenB)
  }, [tokenA, tokenB, index])

  return (
    <StyledContainer>
      <Card>
        <Overlay isShown={showOverlay} text="No data available" />
        <Overlay isShown={isLoading} text="Loading..." />
        <CardBody>
          <Row>
            {tokenA && tokenB ? (
              <>
                <CurrencyLogo currency={tokenA} size="2em" />
                <Text fontSize="1.5em" mr="10px" ml="10px" bold>
                  {tokenA?.symbol}
                </Text>
                <Text fontSize="1.5em" mr="10px" ml="10px" bold>
                  /
                </Text>
                <CurrencyLogo currency={tokenB} size="2em" />
                <Text fontSize="1.5em" mr="10px" ml="10px" bold>
                  {tokenB?.symbol}
                </Text>
              </>
            ) : (
              <Text mb="4px" fontSize="2em" bold>
                N/A
              </Text>
            )}
          </Row>
          <div ref={chartContainerRef as unknown as React.RefObject<HTMLDivElement>} />
          {tokenA && tokenB && (
            <Row style={{ paddingTop: '10px' }}>
              <ButtonMenu activeIndex={index} onItemClick={handleClick} scale="sm" variant="subtle">
                <ButtonMenuItem>5m</ButtonMenuItem>
                <ButtonMenuItem>15m</ButtonMenuItem>
                <ButtonMenuItem>1H</ButtonMenuItem>
                <ButtonMenuItem>4H</ButtonMenuItem>
                <ButtonMenuItem>1D</ButtonMenuItem>
              </ButtonMenu>
            </Row>
          )}
        </CardBody>
      </Card>
    </StyledContainer>
  )
}

export default React.memo(Chart)
