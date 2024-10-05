'use client'

import * as React from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import siteplan from '@/assets/siteplan.png'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { UnitPath } from '@/components/unit-path'
import { UnitTransactions } from '@/components/unit-transactions'

export function Siteplan() {
  // TODO: enhancement with react xyflow canvas

  return (
    <div className="flex justify-center">
      <TooltipProvider delayDuration={0}>
        <TransformWrapper>
          <TransformComponent wrapperClass="w-full cursor-grab active:cursor-grabbing">
            <svg
              width="1164"
              height="1265"
              viewBox="0 0 1164 1265"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid meet"
              className="size-full"
            >
              <rect opacity="0.5" width="1163.55" height="1265" fill="url(#pattern0_0_1)" />
              <Sheet>
                <Tooltip>
                  <SheetTrigger asChild>
                    <TooltipTrigger asChild>
                      <UnitPath
                        status="paid"
                        d="M631 441.5L556.5 505L560 508.5L556.5 512L577 536L654.5 469.5L631 441.5Z"
                      />
                    </TooltipTrigger>
                  </SheetTrigger>
                  <TooltipContent className="grid gap-0.5">
                    <p className="font-semibold">Unit 21</p>
                    <p className="text-xs">0x983110309620D911731Ac0932219af06091b6744</p>
                  </TooltipContent>
                </Tooltip>
                <SheetContent className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle>Unit 22</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete your account and
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1">
                    <UnitTransactions />
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button>Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <UnitPath
                status="unpaid"
                d="M535.5 482L556.5 505L631 441.5L621.5 431.5L613.5 438.5L597 419C578.833 434.167 541.5 465.6 537.5 470C533.5 474.4 534.5 479.833 535.5 482Z"
              />
              <UnitPath status="unpaid" d="M601.5 564L577 536L654.5 469.5L678.5 497.5L601.5 564Z" />
              <UnitPath
                status="unpaid"
                d="M612.5 576.5L602 564L678.5 497.5L705 528L627 595L611.5 577.5L612.5 576.5Z"
              />
              <UnitPath status="unpaid" d="M653 625.5L627 595L705 528L731 558.5L653 625.5Z" />
              <UnitPath
                status="unpaid"
                d="M670.5 645.5L653 625.5L731 558.5L747 577.5C752.058 582.861 753.961 586.076 756.5 592L705 635.5L706.5 637.5L680.5 659L669.5 646L670.5 645.5Z"
              />
              <UnitPath
                status="unpaid"
                d="M528.5 523.5L553 502L560 509L556.5 512L612.5 576.5L591 595.5L528.5 523.5Z"
              />
              <UnitPath
                status="unpaid"
                d="M500.5 546.5L528.5 523.5L591 595.5L562.5 619L500.5 546.5Z"
              />
              <UnitPath status="unpaid" d="M472.5 571L500.5 546.5L562.5 619L534 643L472.5 571Z" />
              <UnitPath
                status="unpaid"
                d="M446 593.5L472.5 571L534 643L506.5 666.5L442 592L443.5 590.5L446 593.5Z"
              />
              <UnitPath status="unpaid" d="M414 616.5L442 592L506.5 666.5L478.5 691L414 616.5Z" />
              <UnitPath status="unpaid" d="M387 639.5L414 616.5L478.5 691L450.5 715L387 639.5Z" />
              <UnitPath
                status="unpaid"
                d="M347 674L387 639.5L450.5 715L386 721C382.649 720.19 380.555 719.286 376.5 717L344.5 680.5C345.056 677.815 345.59 676.387 347 674Z"
              />
              <UnitPath
                status="unpaid"
                d="M389 425.5C388.817 423.704 388.783 422.639 389 420.5L415 398.5L472.5 466L443 491L389 425.5Z"
              />
              <UnitPath
                status="unpaid"
                d="M423.5 391.5L415 398.5L472.5 466L500.5 442L441.5 374L422.5 390L423.5 391.5Z"
              />
              <UnitPath
                status="unpaid"
                d="M451.5 358L441.5 374L500.5 442L528.5 418L466.5 346L451.5 358Z"
              />
              <UnitPath status="unpaid" d="M494.5 322L466.5 346L528.5 418L556.5 394L494.5 322Z" />
              <UnitPath status="unpaid" d="M524.5 297L494.5 322L556.5 394L586 368.5L524.5 297Z" />
              <UnitPath status="unpaid" d="M554 272L524.5 297L586 368.5L615.5 343.5L554 272Z" />
              <UnitPath
                status="unpaid"
                d="M625.5 330C622.507 336.042 620.389 339.152 615.5 344L554.5 272.5L547.5 264.5L571.5 243.5L582.5 244.5L603 269L610 269.5L632 295.5C633.964 299.659 634.851 301.759 635.5 304.5C636.765 309.887 637.072 312.838 637 318C636.236 322.443 635.665 324.678 634 327.5C630.017 328.756 628.191 329.289 625.5 330Z"
              />
              <UnitPath
                status="unpaid"
                d="M571.5 233V244L547.5 264.5L476.5 182.5L487.5 173.5L492.5 170.5C495.658 169.171 497.553 168.697 501 168C505.815 167.728 508.432 167.75 513 168C517.04 169 519.139 169.747 522.5 171.5L529.5 176.5L551.5 201V209L571.5 233Z"
              />
              <UnitPath status="unpaid" d="M447.5 206.5L526 296L554 272L476.5 182.5L447.5 206.5Z" />
              <UnitPath status="unpaid" d="M510 309L526 296L447.5 206.5L432.5 219.5L510 309Z" />
              <UnitPath status="unpaid" d="M489.5 326.5L510 309L432.5 219.5L414 235L489.5 326.5Z" />
              <UnitPath status="unpaid" d="M489.5 326.5L473 340.5L393 246.5L397.5 245L414 235" />
              <UnitPath
                status="unpaid"
                d="M363.5 259.5L393 246.5L472.5 340.5L451.5 357.5L406 305.5L401 310L370 274.5C368.332 272.378 367.279 270.37 365 264L363.5 259.5Z"
              />
              <UnitPath
                status="unpaid"
                d="M359.5 261.5L365 264.5C366.699 268.905 367.681 271.021 369.5 274L377 282.5L311 339L291 316C289.944 314.231 289.384 313.002 288.5 310C288.309 305.349 288.568 302.725 290 298C292.465 292.426 294.429 290.039 298.5 286.5L325.5 275.5L359.5 261.5Z"
              />
              <UnitPath status="unpaid" d="M334.5 367.5L311.5 339L377 283L401 310L334.5 367.5Z" />
              <UnitPath status="unpaid" d="M358 395L334.5 367.5L406 305.5L430.5 333.5L358 395Z" />
              <UnitPath
                status="unpaid"
                d="M384 424.5L358.5 395L430.5 334L451.5 357.5L441 374L422.5 390L423.5 392L384 424.5Z"
              />
              <defs>
                <pattern
                  id="pattern0_0_1"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_0_1" transform="scale(0.00044484 0.000409165)" />
                </pattern>
                <image id="image0_0_1" width="2248" height="2444" xlinkHref={siteplan.src} />
              </defs>
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </TooltipProvider>
    </div>
  )
}

export default Siteplan
